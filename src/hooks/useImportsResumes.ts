import { useState, type ChangeEvent } from "react";
import useServices from "./useServices";
import ImportWorker from "@/lib/worker/validateAndNormalizeJSON?worker";
import { AppError, DatabaseError } from "@/utils/error";
import { getAllocatedStorageSize } from "@/utils/getAllocatedStorageSize";
import type { ResumePopulate } from "@/lib/model/resume";
import type { JSONDataPayload, JSONResult } from "@/lib/worker/type";

export function useImportResumes() {
  const [importedResumes, setImportedResumes] = useState<
    ResumePopulate[] | null
  >(null);
  const [conflictedResumeIDs, setConflictedResumeIDs] = useState<Map<
    string,
    string
  > | null>(null);
  const [failedImports, setFailedImports] = useState<Map<
    string,
    string
  > | null>(null);

  const { services } = useServices();

  async function onFileSelect(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target?.files?.[0];

    if (!file) return;

    // Check available storage size
    const storageDetail = await getAllocatedStorageSize();
    const availableStorageSize =
      storageDetail.quota?.size - storageDetail?.usage.size;
    if (file.size > availableStorageSize) {
      throw new DatabaseError(
        `File content is out of storage space`,
        "STORAGE_FULL",
      );
    }

    const type = file.type;
    if (type !== "json" && type !== "application/json") {
      throw new AppError(
        `Unsupported file type "${type}". Try to upload "JSON" file.`,
      );
    }

    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = async () => {
      if (reader.result && typeof reader.result === "string") {
        const res = JSON.parse(reader.result) as ResumePopulate[];
        // convert non-array collection into array
        const resumes = Array.isArray(res) ? res : [res];

        // get resumes from db to check name confliction
        const resumesName = await services?.resumeSrv.getResumesName();
        const parsedResume = new Map();

        const worker = new ImportWorker();
        resumes.forEach((resume, idx) => {
          // send resume for worker to parse, validate and normalize
          worker.postMessage({
            taskID: idx?.toString(),
            payload: resume,
            status: "PROCESS_PAYLOAD",
            type: "IMPORT",
          } satisfies JSONDataPayload<ResumePopulate>);
        });

        worker.postMessage({
          status: "END_BATCH",
          type: "IMPORT",
        } satisfies JSONDataPayload<ResumePopulate>);

        worker.onmessage = (
          event: MessageEvent<JSONResult<ResumePopulate>>,
        ) => {
          const { type, result } = event.data ?? {};

          // Ignore worker error for now, since it is not used yet
          // in the future, show log while parsing the JSON
          if (type === "TASK_FAIL") return;

          if (type === "RESULT") {
            const resume = result;
            // if resume not found do nothing
            if (!resume) return;

            // store parsed resume
            parsedResume.set(resume.id, resume);
          }

          if (type === "DONE") {
            const conflictedIDs = new Map();
            resumes?.forEach((resume) => {
              const match = resumesName?.find(
                (rmName) => resume.meta?.title === rmName?.name,
              );
              if (match) {
                conflictedIDs.set(resume.id, match.id);
              }
            });
            if (conflictedIDs.size > 0) {
              setConflictedResumeIDs(conflictedIDs);
            }

            setImportedResumes(Array.from(parsedResume.values()));

            // terminate worker after conflict check done
            worker.terminate();
          }
        };

        worker.onerror = (event) => {
          // terminate worker
          worker.terminate();

          throw event.error;
        };
      }
    };

    reader.onerror = () => {
      throw new AppError(reader.error?.message || "Failed to read file");
    };
  }

  async function onImportConfirm(ids?: string[], override?: boolean) {
    const resumeToSave = ids?.length
      ? importedResumes?.filter((resume) => ids?.some((id) => id === resume.id))
      : importedResumes;

    const results = await Promise.allSettled(
      resumeToSave?.map((resume) => {
        // Resume id that is already in the database, so that
        // replace the saved resume by newly imported one
        const conflictedID = conflictedResumeIDs?.get(resume.id);

        return conflictedID && override
          ? services?.resumeSrv.updateResume(conflictedID, resume)
          : services?.resumeSrv.createNewResume(resume, {
              title: resume.meta?.title,
              id: resume.id,
            });
      }) ?? [],
    );

    const getFailedResumes = results.filter((res) => res.status === "rejected");
    if (getFailedResumes.length) {
      setFailedImports(() => {
        // Reverse key mapping for failed resumes.
        // conflictedResumeIDs map holds [imported_resume_id => conflicted_resume_id]
        // Error object returns provided payload data in `error.attachment` field
        // for creating new resume key mapping is worthless since it's
        // hold original id, but for conflicted resumes it requires
        // to pass actual saved ID, which [assume always] defer from the imported
        // resume due to the title comparison to check confliction.
        const map = new Map<string, string>();
        const originalIDsArr = Array.from(conflictedResumeIDs ?? []);
        getFailedResumes.forEach((res) => {
          if (res.reason instanceof DatabaseError) {
            const attachment = res.reason.attachment as ResumePopulate;

            const importedResumeId =
              originalIDsArr.find(
                ([_, val]) => val === attachment?.id,
              )?.[0] /* imported_resume id */ ?? attachment?.id; // whatever id found in the error attachemnt
            if (importedResumeId) {
              map.set(importedResumeId, res.reason.message);
            }
          }
        });
        return map;
      });
    }

    return results;
  }

  function clearImport() {
    setImportedResumes(null);
    setConflictedResumeIDs(null);
    setFailedImports(null);
  }

  return {
    importedResumes,
    conflictedResumes: conflictedResumeIDs,
    onJSONPick: onFileSelect,
    onImportConfirm,
    failedImports,
    clearImport,
  } as const;
}

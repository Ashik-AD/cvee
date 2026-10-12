import { Download, FileCode, FileUp, Upload } from "lucide-react";
import { Flex, FlexColumn } from "../common/layout";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Activity, useRef, useState, type ChangeEvent } from "react";
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Input } from "../ui/input";
import ResumeLookup from "../common/ResumeLookup";
import { useModalActions } from "@/store/modal";
import useCreateResume from "@/hooks/useCreateResume";
import type { Resume } from "@/lib/model/resume";
import { useResumeActions } from "@/store";
import useServices from "@/hooks/useServices";
import type { ResumePopulate } from "@/lib/model/resume";
import { useEditorActions } from "@/features/editor/store";
import { useLocation } from "wouter";
import { cn } from "cn";
import { toast } from "../ui/toast";
import { AppError, getErrorMessage } from "@/utils/error";

type ImportDestination = "createNew" | "override";

const tabs = [
  {
    icon: FileUp,
    label: "File Upload",
    key: "filePicker",
  },
  {
    icon: FileCode,
    label: "Raw JSON",
    key: "rawJson",
  },
];
function ResumeImport() {
  const [mode, setMode] = useState<"filePicker" | "rawJson">("filePicker");
  const [importAction, setImportAction] =
    useState<ImportDestination>("createNew");
  const [importedCv, setImportCv] = useState<Resume | ResumePopulate | null>(
    null,
  );
  const [overrideId, setOverrideId] = useState<string | null>(null);
  const resumeNameInputRef = useRef<HTMLInputElement | null>(null);

  const { closeModal } = useModalActions();
  const createResume = useCreateResume();
  const { addResume, updateResume } = useResumeActions();
  const { services } = useServices();
  const { setEditor } = useEditorActions();
  const [_, navigate] = useLocation();

  async function handleFileImport(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.item(0);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const json = JSON.parse(reader.result?.toString() ?? "");

        // Set resume name for create as new
        const resumeName =
          json?.meta?.title ?? `Imported - ${json?.personalInfo?.role}`;
        if (resumeNameInputRef.current) {
          resumeNameInputRef.current.value = resumeName;
        }

        setImportCv(json);
        setMode("rawJson");
      };
      reader.onerror = (error) => {
        toast.add({
          type: "error",
          title: getErrorMessage(error, "Failed to read JSON file."),
        });
      };
      reader.readAsText(file);
    }
  }

  async function handleCreateNewFromImportedJson(resume: Partial<Resume>) {
    if (!resume) {
      toast.add({
        type: "warning",
        title: "File is empty. Please make sure you import right file",
      });
      return;
    }
    try {
      const resumeName = resumeNameInputRef.current?.value;

      const res = await createResume(resume, resumeName);
      if (res) {
        setEditor(res);
        addResume(res);

        // redirect to editor for edit
        navigate(`/editor?id=${res.id}`);
      }
    } catch (error) {
      toast.add({
        type: "error",
        title: getErrorMessage(
          error,
          "Failed to create a cv from imported JSON.",
        ),
      });
    }
  }

  async function handleOverrideTargetResume(
    resumeId: string | null,
    resume: Resume,
  ) {
    if (!resumeId || !importedCv) return;
    try {
      const targetResume = await services?.resumeSrv.getResumeById(resumeId);
      if (!targetResume) {
        throw new AppError("Target resume not found.");
      }

      const normalize = { ...resume, meta: targetResume.meta, id: resumeId };

      // update target resume to override with exported resume
      const res = await services?.resumeSrv.updateResume(resumeId, {
        ...normalize,
      });
      if (res) {
        // populate/set editor
        setEditor(res);

        // Refetch all resumes
        updateResume(res)
        // const resumes = await services?.resumeSrv.getResumes();
        // if (resumes) {
        //   setResumes(resumes);
        // }
      }
    } catch (error) {
      toast.add({
        type: "error",
        title: getErrorMessage(error, "Failed override resume: "),
      });
    }
  }

  async function handleImport() {
    try {
      if (!importedCv) {
        throw new AppError("No resume found to be import");
      }
      if (importAction === "createNew") {
        await handleCreateNewFromImportedJson(importedCv);
      }
      if (importAction === "override") {
        await handleOverrideTargetResume(overrideId, importedCv);
      }
      closeModal();
    } catch (error) {
      toast.add({
        type: "error",
        title: getErrorMessage(error, "Failed to import json cv"),
      });
    }
  }

  return (
    <FlexColumn className="w-full gap-3">
      {/* File picker & Raw json*/}
      <FlexColumn className="w-full gap-2">
        <Flex className="border-b">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = mode === tab.key;
            return (
              <Button
                key={tab.key}
                variant="ghost"
                onClick={() => setMode(tab.key as typeof mode)}
                className={cn(
                  isActive && "text-emerald-500 border-b! border-b-emerald-700",
                  "border-b",
                )}
              >
                <Icon />
                {tab.label}
              </Button>
            );
          })}
        </Flex>
        <Activity mode={mode === "filePicker" ? "visible" : "hidden"}>
          <Label>
            <FlexColumn className="w-full bg-neutral-0E0E0E items-center justify-center gap-3 px-4 py-10 rounded-sm border border-dashed hover:bg-neutral-1C1B1B group">
              <Flex className="bg-neutral-2A2A2A size-14 items-center justify-center rounded-sm">
                <Upload size={32} className="group-hover:animate-bounce" />
              </Flex>
              <p>Drag and drop your schema file here, or Browse files</p>
              <input type="file" hidden onChange={handleFileImport} />
            </FlexColumn>
          </Label>
        </Activity>
        <Activity mode={mode === "rawJson" ? "visible" : "hidden"}>
          <Textarea
            rows={20}
            placeholder="Paste or edit json"
            className="max-h-132 min-h-41 scrollbar-thin"
            value={JSON.stringify(importedCv, null, 2)?.trim() || ""}
          />
        </Activity>
      </FlexColumn>

      <Separator />

      <FlexColumn className="gap-3">
        <h3 className="uppercase">Import Destination</h3>

        <RadioGroup
          className="flex"
          onValueChange={(val) => setImportAction(val)}
          defaultValue="createNew"
        >
          <Label htmlFor="createNew" className="border flex-1 p-2 rounded-sm">
            <FlexColumn className="gap-4 w-full">
              <Flex className="gap-1.5 items-center">
                <RadioGroupItem value="createNew" id="createNew" />
                <span>Create as new CV</span>
              </Flex>
              <Input
                placeholder="CV name"
                className="w-full bg-neutral-0E0E0E"
                ref={resumeNameInputRef}
              />
            </FlexColumn>
          </Label>

          <Label htmlFor="override" className="border flex-1 p-2 rounded-sm">
            <FlexColumn className="gap-4 w-full">
              <Flex className="gap-1.5 items-center">
                <RadioGroupItem value="override" id="override" />
                <span>Override resume</span>
              </Flex>
              <ResumeLookup onChange={(val) => setOverrideId(val)} />
            </FlexColumn>
          </Label>
        </RadioGroup>
      </FlexColumn>

      <Separator />
      <Flex className="justify-end items-center gap-4">
        <Button variant="ghost" onClick={closeModal}>
          Cancel
        </Button>

        <Button onClick={handleImport} disabled={importedCv === null}>
          <Download />
          Import Resume
        </Button>
      </Flex>
    </FlexColumn>
  );
}

export default ResumeImport;

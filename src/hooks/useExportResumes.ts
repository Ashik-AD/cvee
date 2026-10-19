import { useEffect, useRef, useState } from 'react';
import useServices from './useServices';
import type { ResumePopulate } from '@/lib/model/resume';
import { AppError, getErrorMessage } from '@/utils/error';

import ExportWorker from '../lib/worker/validateAndNormalizeJSON?worker';
import { downloadAsFile } from '@/utils/downloadAsFile';
import type { JSONDataPayload, JSONResult } from '@/lib/worker/type';

export default function useExportResumes() {
  const [jsonConut, setJsonCount] = useState(0);
  const [parsedJsonCount, setParsedJsonCount] = useState(0);
  const [failedJSONS, setFailedJSONS] = useState<
    { json: ResumePopulate; reason: any }[] | null
  >(null);
  const [error, setError] = useState<string | null>(null);
  const { services } = useServices();

  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    return () => {
      if (workerRef.current !== null) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, []);

  async function exportAllResumeJSON() {
    const resumes = await services?.resumeSrv.getResumes();
    if (!resumes || resumes?.length === 0) {
      throw new AppError('No resume found to export');
    }
    setJsonCount(resumes.length);

    const parsedResumes = new Map();

    // Clear previous worker if initialized
    if (workerRef.current !== null) {
      workerRef.current.terminate();
      workerRef.current = null;
    }

    // initialize worker
    workerRef.current = new ExportWorker();
    const worker = workerRef.current;

    if (worker) {
      // feed the resume json into worker
      resumes.forEach((resume, idx) => {
        worker.postMessage({
          taskID: idx.toString(),
          type: 'EXPORT',
          payload: resume,
          status: 'PROCESS_PAYLOAD',
        } satisfies JSONDataPayload<ResumePopulate>);
        setParsedJsonCount((prev) => prev + 1);
      });
    }

    // send worker to no more task to execute
    worker.postMessage({
      type: 'EXPORT',
      status: 'END_BATCH',
    } satisfies JSONDataPayload<ResumePopulate>);

    worker.onmessage = (event: MessageEvent<JSONResult<ResumePopulate>>) => {
      // inc. the parsed count whether
      // supplied JSON parsing succeed or failed
      setParsedJsonCount((prev) => prev + 1);

      const data = event.data;
      // collect errors
      if (data.type === 'TASK_FAIL') {
        setFailedJSONS((prev) => {
          const newFailedJsons = prev?.splice(0) ?? [];
          newFailedJsons?.push({
            json: data.result,
            reason: data.error,
          });
          return newFailedJsons;
        });
      }

      if (data.type === 'RESULT') {
        const resume = data.result;
        parsedResumes.set(resume.id, resume);
      }

      // call download function, this will
      // not download until all the JSON is parsed
      if (data.type === 'DONE') {
        downloadParsedJSONS();
        worker.terminate();
      }
    };

    worker.onerror = (err) => {
      setError(getErrorMessage(err, 'Failed to parse resume'));
      worker.terminate();
    };

    function downloadParsedJSONS() {
      downloadAsFile(
        Array.from(parsedResumes.values()),
        'resumes.json',
        'application/json',
      );
    }
  }

  return {
    error,
    failed: failedJSONS,
    parseSuccessCount: parsedJsonCount,
    total: jsonConut,
    onExport: exportAllResumeJSON,
  } as const;
}

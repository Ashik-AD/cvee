import { useState } from "react";
import useServices from "./useServices";

export function useExportResume() {
  const [error, setError] = useState<string | null>(null);
  const { services } = useServices();

  async function exportResumeAsJSON(id: string, name?: string) {
    try {
      if (!id?.trim()) {
        return setError("ID is not provided");
      }

      const resume = await services?.editor.getResumeById(id);
      if (!resume) {
        return setError("Resume not found to export");
      }

      const toJSON = JSON.stringify(resume, null, 2);
      const fileName =
        name ??
        `${resume.personalInfo?.name}-${resume.meta?.title ?? resume?.personalInfo?.role}.json`;

      const file = new File([toJSON], fileName, {
        type: "application/json",
      });

      const fileUrl = URL.createObjectURL(file);

      const downloadLinkEl = document.createElement("a");
      downloadLinkEl.href = fileUrl;
      downloadLinkEl.download = fileName;
      downloadLinkEl.className = "absolute invisible";

      document.body.appendChild(downloadLinkEl);

      downloadLinkEl.click();

      document.body.removeChild(downloadLinkEl);

      URL.revokeObjectURL(fileUrl);
    } catch (err: any) {
      setError(err?.message || err);
    }
  }

  return { error, exportResume: exportResumeAsJSON } as const;
}

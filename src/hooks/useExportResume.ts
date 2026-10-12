import { useState } from "react";
import useServices from "./useServices";
import { AppError, getErrorMessage } from "@/utils/error";

export function useExportResume() {
  const [error, setError] = useState<string | null>(null);
  const { services } = useServices();

  async function exportResumeAsJSON(id: string, name?: string) {
    try {
      if (!id?.trim()) {
        throw new AppError("ID is not provided");
      }

      const resume = await services?.resumeSrv.getResumeById(id);
      if (!resume) {
        throw new AppError("Resume not found to export");
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
    } catch (err) {
      setError(
        getErrorMessage(err, "Failed to export resume. Please try again."),
      );
    }
  }

  return { error, exportResume: exportResumeAsJSON } as const;
}

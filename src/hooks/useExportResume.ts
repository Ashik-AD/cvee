import { useState } from 'react';
import useServices from './useServices';
import { AppError, getErrorMessage } from '@/utils/error';
import { normalizeJsonToExport } from '@/utils/normalizeJSON';
import { downloadAsFile } from '@/utils/downloadAsFile';

export function useExportResume() {
  const [error, setError] = useState<string | null>(null);
  const { services } = useServices();

  async function exportResumeAsJSON(id: string, name?: string) {
    try {
      if (!id?.trim()) {
        throw new AppError('ID is not provided');
      }

      const resume = await services?.resumeSrv.getResumeById(id);
      if (!resume) {
        throw new AppError('Resume not found to export');
      }

      const normalize = normalizeJsonToExport(JSON.stringify(resume));
      const fileName =
        name ??
        `${resume.personalInfo?.name}-${resume.meta?.title ?? resume?.personalInfo?.role}.json`;
      downloadAsFile(normalize, fileName, 'application/json');
    } catch (err) {
      setError(
        getErrorMessage(err, 'Failed to export resume. Please try again.'),
      );
    }
  }

  return { error, exportResume: exportResumeAsJSON } as const;
}

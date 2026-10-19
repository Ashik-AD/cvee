import { useEffect, useState } from 'react';
import useServices from './useServices';
import { getErrorMessage } from '@/utils/error';
import type { ResumePopulate } from '@/lib/model/resume';

export default function useGetResume(resumeId: string | null) {
  const [resume, setResume] = useState<ResumePopulate | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { services } = useServices();

  useEffect(() => {
    if (loading || !resumeId) return;

    setLoading(true);
    services?.resumeSrv
      .getResumeById(resumeId)
      .then((result: any) => {
        setResume(result);
      })
      .catch((error) => {
        setError(getErrorMessage(error));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [resumeId]);

  return { resume, isLoading: loading, error } as const;
}

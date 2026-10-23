import { useEffect, useState } from 'react';
import useServices from './useServices';
import { getErrorMessage } from '@/utils/error';
import type { ResumePopulate } from '@/lib/model/resume';

export default function useGetResume(resumeId: string | null) {
  const [resume, setResume] = useState<ResumePopulate | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { services } = useServices();

  const resumeService = services?.resumeSrv;

  useEffect(() => {
    let cancelled = false;

    async function fetchResume() {
      if (!resumeId || !resumeService) {
        setResume(null);
        setError(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      setResume(null);

      try {
        const result = await resumeService.getResumeById(resumeId);

        if (!cancelled) {
          setResume(result);
        }
      } catch (error: unknown) {
        if (!cancelled) {
          setError(getErrorMessage(error));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void fetchResume();

    return () => {
      cancelled = true;
    };
  }, [resumeId, resumeService]);

  return { resume, isLoading: loading, error } as const;
}

import useServices from '@/hooks/useServices';
import type { ResumePopulate } from '@/lib/model/resume';
import { getErrorMessage } from '@/utils/error';
import { useEffect, useState } from 'react';

export function useFetchResumes() {
  const [resumes, setResumes] = useState<ResumePopulate[] | null>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setPending] = useState(false);
  const { services } = useServices();

  useEffect(() => {
    if (services) {
      setPending(true);
      services.resumeSrv
        .getResumes()
        .then((resumes) => {
          setResumes(resumes);
        })
        .catch((err) => {
          setError(getErrorMessage(err));
        })
        .finally(() => {
          setPending(false);
        });
    }
  }, [services]);

  return { data: resumes, error, isPending } as const;
}

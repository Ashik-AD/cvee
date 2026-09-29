import { useEffect, useState } from "react";
import useServices from "./useServices";
import type { ResumePopulate } from "@/lib/service/editor";

export default function useGetResume(resumeId: string | null) {
  const [resume, setResume] = useState<ResumePopulate | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { services } = useServices();

  useEffect(() => {
    if (loading || !resumeId) return;
    setLoading(true);
    services?.editor
      .getResumeById(resumeId)
      .then((result) => {
        setResume(result);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [resumeId]);

  return { resume, isLoading: loading } as const;
}

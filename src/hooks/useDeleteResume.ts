import { useResumeActions } from "@/store";
import useServices from "./useServices";

export default function useDeleteResume() {
  const { services } = useServices();
  const { deleteResume } = useResumeActions();

  async function handleDelete(resumeId: string) {
    try {
      if (!resumeId?.trim()) {
        throw new Error("Resume id missing");
      }
      await services?.editor?.deleteResume(resumeId);
      // Also delete resume from the store
      deleteResume(resumeId);
    } catch (error) {
      console.error("Failed to delete resume", error);
      return error;
    }
  }

  return handleDelete;
}

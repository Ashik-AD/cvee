import { useResumeActions } from '@/store';
import useServices from './useServices';

export default function useDeleteResume() {
  const { services } = useServices();
  const { deleteResume } = useResumeActions();

  async function handleDelete(resumeId: string) {
    await services?.resumeSrv.deleteResume(resumeId);
    // Also delete resume from the store
    deleteResume(resumeId);
  }

  return handleDelete;
}

import { useAlertDialogActions } from '@/store/alert-dialog';
import { ActionInteruptDialog } from '../common/ActionInteruptDialog';
import useDeleteResume from '@/hooks/useDeleteResume';
import { useEditorActions } from '@/features/editor/store';
import { useLocation } from 'wouter';
import { useState } from 'react';
import { toast } from '../ui/toast';

function ConfirmDeleteResume({ id }: { id: string }) {
  const deleteResume = useDeleteResume();
  const { closeAlertDialog } = useAlertDialogActions();
  const { resetEditor } = useEditorActions();
  const [_, navigate] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    setIsLoading(true);
    if (id?.trim()) {
      try {
        await deleteResume(id);
        // Reset editor
        resetEditor();
        // Redirect to dashboard
        navigate('/');
      } catch (error) {
        toast.add({
          type: 'error',
          title: (error as Error).message || 'Failed to delete resume.',
        });
      } finally {
        setIsLoading(false);
        closeAlertDialog();
      }
    }
  }

  return (
    <ActionInteruptDialog
      open
      isLoading={isLoading}
      title="Delete this sh*t"
      description="Just making sure this is not an accident."
      type="destructive"
      onConfirm={handleDelete}
      onOpenChange={closeAlertDialog}
    />
  );
}

export default ConfirmDeleteResume;

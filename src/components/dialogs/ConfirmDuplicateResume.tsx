import useCreateDuplicateResume from "@/hooks/useCreateDuplicateResume";
import { useAlertDialogActions } from "@/store/alert-dialog";
import { ActionInteruptDialog } from "../common/ActionInteruptDialog";
import { useLocation } from "wouter";
import { toast } from "../ui/toast";
import { getErrorMessage } from "@/utils/error";

function ConfirmDuplicateResume({ id }: { id: string }) {
  const duplicateResume = useCreateDuplicateResume(id);
  const { closeAlertDialog } = useAlertDialogActions();
  const [_, navigate] = useLocation();

  async function handleDuplicate() {
    try {
      const res = await duplicateResume();
      if (res) {
        navigate(`/editor?id=${res.id}`);
      }
    } catch (err) {
      toast.add({
        type: "error",
        title: getErrorMessage(err),
      });
    } finally {
      closeAlertDialog();
    }
  }

  return (
    <ActionInteruptDialog
      open
      title="Want to duplicate"
      description="Duplicate this resume and start editing immediately"
      onConfirm={handleDuplicate}
      onOpenChange={closeAlertDialog}
    />
  );
}

export default ConfirmDuplicateResume;

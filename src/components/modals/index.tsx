import { modalsContent } from "@/constants/modalsContent";
import { useModalActions, useModalState } from "@/store/modal";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { cn } from "cn";

function ModalRender() {
  const { isOpen, modalName, modalProps } = useModalState();
  const { closeModal } = useModalActions();
  const modal = modalsContent?.[modalName];

  if (!modal) return;

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className={cn(modal.className)}>
        <DialogHeader>
          {modal.title && <DialogTitle>{modal.title}</DialogTitle>}
          {modal.description && (
            <DialogDescription>{modal.description}</DialogDescription>
          )}
        </DialogHeader>
        {<modal.element {...(modalProps ?? {})} />}
      </DialogContent>
    </Dialog>
  );
}

export default ModalRender;

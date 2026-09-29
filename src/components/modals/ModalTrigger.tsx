import { useModalActions } from "@/store/modal";
import type { ReactNode } from "react";

type RenderProps = (
  onClick: (modalName: string, modalProps?: unknown) => void,
) => ReactNode;
type ModalTriggerProps = {
  render: RenderProps;
};

function ModalTrigger({ render }: ModalTriggerProps) {
  const { setModalOpen } = useModalActions();
  return <>{render(setModalOpen)}</>;
}

export default ModalTrigger;

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { useShallow } from 'zustand/shallow';

type State = {
  modalName: string;
  isOpen: boolean;
  modalProps: unknown;
  actions: {
    setModalOpen: (modalName: string, modalProps?: unknown) => void;
    closeModal: () => void;
  };
};

export const useModalStore = create<State>()(
  devtools(
    immer((set, _, store) => ({
      modalName: '',
      isOpen: false,
      modalProps: null,
      actions: {
        setModalOpen(modalName, modalProps) {
          set((state) => {
            state.isOpen = true;
            state.modalName = modalName;
            state.modalProps = modalProps;
          });
        },

        closeModal() {
          set(store.getInitialState());
        },
      },
    })),
    {
      name: 'modalStore',
    },
  ),
);

export const useModalActions = () => useModalStore((state) => state.actions);
export const useModalState = () =>
  useModalStore(
    useShallow((state) => ({
      modalName: state.modalName,
      isOpen: state.isOpen,
      modalProps: state.modalProps,
    })),
  );

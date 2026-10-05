import type { AlertDialogKeys } from "@/constants/alertDialogContent";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/shallow";

type State = {
  alertName: AlertDialogKeys | null;
  isOpen: boolean;
  alertProps: unknown;
  actions: {
    setAlertDialogOpen<TProps = Record<string, unknown>>(
      alertName: AlertDialogKeys,
      alertProps?: TProps,
    ): void;
    closeAlertDialog: () => void;
  };
};

export const useAlertDialogStore = create<State>()(
  devtools(
    immer((set, _, store) => ({
      alertName: null,
      isOpen: false,
      alertProps: null,
      actions: {
        setAlertDialogOpen(modalName, modalProps) {
          set((state) => {
            state.isOpen = true;
            state.alertName = modalName;
            state.alertProps = modalProps;
          });
        },

        closeAlertDialog() {
          set(store.getInitialState());
        },
      },
    })),
    {
      name: "alertDialogStore",
    },
  ),
);

export const useAlertDialogActions = () =>
  useAlertDialogStore((state) => state.actions);
export const useAlertDialogState = () =>
  useAlertDialogStore(
    useShallow((state) => ({
      alertName: state.alertName,
      isOpen: state.isOpen,
      alertProps: state.alertProps,
    })),
  );

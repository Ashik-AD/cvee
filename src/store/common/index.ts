import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/shallow";

type State = {
  lastOpendId: string | null;
  editorRef: HTMLDivElement | null;
  actions: {
    setLastOpendId: (id: string) => void;
    setEditorRef: (payload: HTMLDivElement | null) => void;
  };
};

export const useCommonStore = create<State>()(
  devtools(
    persist(
      immer((set) => ({
        lastOpendId: null,
        editorRef: null,

        actions: {
          setLastOpendId: (id) => {
            set((state) => {
              state.lastOpendId = id;
            });
          },
          setEditorRef: (payload) => {
            set((state) => {
              state.editorRef = payload;
            });
          },
        },
      })),
      {
        name: "cvee-storage",
        partialize: (state) => ({
          lastOpendId: state.lastOpendId,
        }),
      },
    ),
    {
      name: "commonStore",
    },
  ),
);

export const useCommonActions = () => useCommonStore((state) => state.actions);
export const useCommonState = () =>
  useCommonStore(
    useShallow((state) => ({
      lastOpendId: state.lastOpendId,
      editorRef: state.editorRef,
    })),
  );

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/shallow";

type State = {
  lastOpendId: string | null;
  previewId: string | null;
  showPreview: boolean;
  renameResume: boolean;
  actions: {
    setLastOpendId: (id: string) => void;
    setPreviewId: (payload: string) => void;
    clearPreviewId: () => void;
    togglePreview: () => void;
    toggleRenameResume: () => void;
  };
};

export const useCommonStore = create<State>()(
  devtools(
    persist(
      immer((set) => ({
        lastOpendId: null,
        editorRef: null,
        previewId: null,
        showPreview: false,
        renameResume: false,

        actions: {
          setLastOpendId: (id) => {
            set((state) => {
              state.lastOpendId = id;
            });
          },
          setPreviewId(payload) {
            set((state) => {
              state.previewId = payload;
            });
          },
          clearPreviewId() {
            set((state) => {
              state.previewId = null;
            });
          },
          togglePreview() {
            set((state) => {
              state.showPreview = !state.showPreview;
            });
          },

          toggleRenameResume() {
            set((state) => {
              state.renameResume = !state.renameResume;
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
      previewId: state.previewId,
      isShowPreview: state.showPreview,
    })),
  );

export const useResumePreviewState = () =>
  useCommonStore(
    useShallow((state) => ({
      previewId: state.previewId,
      isShowPreview: state.showPreview,
    })),
  );

export const useRenameResumeState = () =>
  useCommonStore(
    useShallow((state) => ({ isRenameResume: state.renameResume })),
  );

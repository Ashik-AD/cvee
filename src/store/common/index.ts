import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/shallow";

type State = {
  lastOpendId: string | null;
  previewId: string | null;
  showPreview: boolean;
  renameResume: boolean;
  showCommandCenter: boolean;
  actions: {
    setLastOpendId: (id: string) => void;
    setPreviewId: (payload: string) => void;
    clearPreviewId: () => void;
    togglePreview: () => void;
    toggleRenameResume: () => void;
    toggleCommandCenter: () => void;
    setShowCommandCenter: (val: boolean) => void;
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
        showCommandCenter: false,

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
          toggleCommandCenter() {
            set((state) => {
              state.showCommandCenter = !state.showCommandCenter;
            });
          },
          setShowCommandCenter(payload) {
            set((state) => {
              state.showCommandCenter = payload;
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

export const useCommandCenterState = () =>
  useCommonStore(
    useShallow((state) => ({
      showCommandCenter: state.showCommandCenter,
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

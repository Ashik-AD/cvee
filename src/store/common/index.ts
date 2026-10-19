import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { useShallow } from 'zustand/shallow';

type DashboardDataView = 'grid' | 'list';
type State = {
  lastOpendId: string | null;
  previewId: string | null;
  showPreview: boolean;
  renameResume: boolean;
  showCommandCenter: boolean;
  dashboardDataView: DashboardDataView;
  actions: {
    setLastOpendId: (id: string) => void;
    setPreviewId: (payload: string) => void;
    clearPreviewId: () => void;
    togglePreview: () => void;
    toggleRenameResume: () => void;
    toggleCommandCenter: () => void;
    setShowCommandCenter: (val: boolean) => void;
    setDashboardDataView: (view: DashboardDataView) => void;
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
        dashboardDataView: 'grid',

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
          setDashboardDataView(view) {
            set((state) => {
              state.dashboardDataView = view;
            });
          },
        },
      })),
      {
        name: 'cvee-storage',
        partialize: (state) => ({
          lastOpendId: state.lastOpendId,
          dashboardDataView: state.dashboardDataView,
        }),
      },
    ),
    {
      name: 'commonStore',
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

export const useDashboardDataView = () =>
  useCommonStore(
    useShallow((state) => ({ dataView: state.dashboardDataView })),
  );

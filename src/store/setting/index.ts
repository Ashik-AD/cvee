import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { useShallow } from 'zustand/shallow';

type ViewSetting = {
  editorMode: 'preview' | 'editor' | 'split';
  editorView: 'desktop' | 'mobile';
};
type State = {
  editorMode: ViewSetting['editorMode'];
  editorView: ViewSetting['editorView'];

  actions: {
    setViewSetting: (payload: Partial<ViewSetting>) => void;
  };
};

export const useSettingStore = create<State>()(
  devtools(
    persist(
      immer((set) => ({
        editorMode: 'split',
        editorView: 'desktop',

        actions: {
          setViewSetting(payload) {
            set((state) => {
              Object.keys(payload).forEach((key) => {
                const typedKey = key as keyof ViewSetting;
                //@ts-ignore-next-line
                state[typedKey] = payload[typedKey];
              });
            });
          },
        },
      })),
      {
        name: 'settings',
        partialize: (state) => {
          const { actions, ...rest } = state;
          return rest;
        },
      },
    ),
    {
      name: 'settingStore',
    },
  ),
);

export const useSettingActions = () =>
  useSettingStore((state) => state.actions);

export const useSettingState = () =>
  useSettingStore(
    useShallow((state) => ({
      editorView: state.editorView,
      editorMode: state.editorMode,
    })),
  );

export const useViewSettingState = () =>
  useSettingStore(
    useShallow((state) => ({
      view: state.editorView,
      mode: state.editorMode,
    })),
  );

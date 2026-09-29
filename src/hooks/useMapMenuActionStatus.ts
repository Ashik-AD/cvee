import type { ActionKey } from "@/constants/menubar";
import { useSettingState } from "@/store/setting";

export default function useMapMenuAactionStatus() {
  const settings = useSettingState();

  return function mappedStatus(
    actionKey: ActionKey,
  ): { active: boolean; value: string } | null {
    switch (actionKey) {
      case "view-editor":
      case "view-split":
      case "view-preview":
        const mode = settings.editorMode;
        let res = {
          active: false,
          value: mode,
        };
        if (actionKey === "view-preview") {
          res.active = mode === "preview";
        } else if (actionKey === "view-split") {
          res.active = mode === "split";
        } else if (actionKey === "view-editor") {
          res.active = mode === "editor";
        }
        return res;

      case "view-desktop":
      case "view-mobile":
        const view = settings.editorView;
        let modeState = {
          active: false,
          value: view,
        };
        if (actionKey === "view-desktop") {
          modeState.active = view === "desktop";
        } else if (actionKey === "view-mobile") {
          modeState.active = view === "mobile";
        }
        return modeState;

      default:
        return null;
    }
  };
}

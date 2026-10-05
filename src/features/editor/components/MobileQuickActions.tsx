import { Flex } from "@/components/common/layout";
import type { ActionKey } from "@/constants/menubar";
import useMenuActions from "@/hooks/useMenuActions";
import {
  Download,
  Eye,
  Keyboard,
  Printer,
  Star,
  type LucideIcon,
} from "lucide-react";
import { useViewSettingState } from "@/store/setting";

const ACTIONS: { label: string; icon: LucideIcon; actionKey: ActionKey }[] = [
  {
    label: "Template",
    actionKey: "change-template",
    icon: Star,
  },
  {
    label: "Print",
    actionKey: "print-pdf",
    icon: Printer,
  },
  {
    label: "Export",
    actionKey: "export-json",
    icon: Download,
  },
];

function MobileQuickActions() {
  const { execMenuAction } = useMenuActions();
  const { mode } = useViewSettingState();

  async function handleQuickAction(key: ActionKey) {
    if ((key === "print-cv" || key === "print-pdf") && mode === "editor") {
      await execMenuAction("view-preview");
    }
    await execMenuAction(key);
  }

  return (
    <Flex className="items-center gap-2 bg-neutral-1C1B1B p-1 border absolute bottom-2 -translate-x-1/2 left-1/2 rounded-full hidden-on-print">
      <button
        type="button"
        className="flex items-center justify-center gap-2 flex-1 focus-visible:ring cursor-pointer hover:bg-neutral-0E0E0E p-2 rounded-full"
        onClick={() =>
          handleQuickAction(mode === "editor" ? "view-preview" : "view-editor")
        }
      >
        {mode === "editor" ? <Eye /> : <Keyboard />}
        <span className="text-sm">
          {mode === "editor" ? "Preview" : "Editor"}
        </span>
      </button>
      {ACTIONS.map((action) => {
        return (
          <button
            type="button"
            key={action.actionKey}
            className="flex items-center justify-center gap-2 flex-1 focus-visible:ring cursor-pointer hover:bg-neutral-0E0E0E p-2 rounded-full"
            onClick={() => handleQuickAction(action.actionKey)}
          >
            <action.icon size={18} className="hidden min-[26rem]:inline-flex" />
            <span className="text-sm">{action.label}</span>
          </button>
        );
      })}
    </Flex>
  );
}

export default MobileQuickActions;

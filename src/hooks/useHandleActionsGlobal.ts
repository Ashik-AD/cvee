import { useEffect } from "react";
import { useCommonActions } from "@/store";
import { useLocation, useSearchParams } from "wouter";
import useMenuActions from "./useMenuActions";
import { useAlertDialogActions } from "@/store/alert-dialog";
import { getErrorMessage } from "@/utils/error";
import { toast } from "@/components/ui/toast";

/**
 * Listen Global Keyboard Event Handling
 * */
export default function useHandleActionsGlobal() {
  const { toggleCommandCenter } = useCommonActions();
  const { setAlertDialogOpen } = useAlertDialogActions();
  const { execMenuAction } = useMenuActions();
  const [location] = useLocation();
  const [searchParams] = useSearchParams();

  const resumeId = searchParams.get("id")?.trim();
  const isResumeBeingEditing = Boolean(
    location.startsWith("/editor") && resumeId,
  );

  async function handleKeyboard(e: KeyboardEvent) {
    const key = e.key?.toLowerCase();

    try {
      if (e.ctrlKey && !e.shiftKey) {
        // toggle command center `K`
        switch (key) {
          case "k": // Show command center
            interuptDown();
            toggleCommandCenter();
            break;

          case "i": // Open import JSON modal
            interuptDown();
            execMenuAction("import-json");
            break;

          case "d": // Duplicate currently open/editing resume
            if (isResumeBeingEditing) {
              interuptDown();
              execMenuAction("duplicate-cv");
            }
            break;

          case "[": // Set editor view to `form` only
            interuptDown();
            await execMenuAction("view-editor");
            break;

          case "]": // Set editor view to `preview` only
            interuptDown();
            await execMenuAction("view-preview");
            break;

          case "\\": // split editor into form & preview
            interuptDown();
            await execMenuAction("view-split");
            break;

          default:
          // No action is found for the key
        }
      }

      // Handle `editor` specifics shortcuts
      if (isResumeBeingEditing) {
        // Handle function key press actions
        // Rename currently open resume
        if (key === "f2") {
          await execMenuAction("rename-cv");
          interuptDown();
          return;
        }

        // Handle 'delete' and Ctl+Shift+D keys
        if (key === "delete" || (e.ctrlKey && e.shiftKey && key === "d")) {
          interuptDown();
          setAlertDialogOpen("deleteResume", { id: resumeId });
          return;
        }

        // Split editor into form and preview
        if (key === "|" && e.ctrlKey && e.shiftKey) {
          interuptDown();
          await execMenuAction("view-split");
          return;
        }
      }

      // Show keyboard shortcuts
      if (e.target && !isTypingTarget(e?.target) && key === "?") {
        interuptDown();
        execMenuAction("keyboard-shortcuts");
        return;
      }
    } catch (error) {
      const msg = getErrorMessage(error);
      toast.add({
        type: "error",
        title: msg,
      });
    }

    function interuptDown() {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => document.removeEventListener("keydown", handleKeyboard);
  }, [isResumeBeingEditing]);
}

function isTypingTarget(target: EventTarget) {
  if (!(target instanceof HTMLElement)) return false;

  const tagName = target.tagName?.toLowerCase();
  return (
    tagName === "input" ||
    tagName === "textarea" ||
    tagName === "select" ||
    target.isContentEditable
  );
}

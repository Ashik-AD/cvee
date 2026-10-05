import { useCommonActions } from "@/store";
import { useModalActions } from "@/store/modal";
import { useEffect } from "react";
import { useLocation, useSearchParams } from "wouter";
import useMenuActions from "./useMenuActions";
import { useAlertDialogActions } from "@/store/alert-dialog";

/**
 * Listen Global Keyboard Event Handling
 * */
export default function useHandleActionsGlobal() {
  const { toggleCommandCenter } = useCommonActions();
  const { setAlertDialogOpen } = useAlertDialogActions();
  const { setModalOpen } = useModalActions();
  const { execMenuAction } = useMenuActions();
  const [location] = useLocation();
  const [searchParams] = useSearchParams();

  const resumeId = searchParams.get("id")?.trim();
  const isResumeBeingEditing = location.startsWith("/editor") && resumeId;

  async function handleKeyboard(e: KeyboardEvent) {
    const key = e.key?.toLowerCase();

    console.log("Pressed key: ", key);

    if (e.ctrlKey && !e.shiftKey) {
      // toggle command center `K`
      switch (key) {
        case "k": // Show command center
          interuptDown();
          toggleCommandCenter();
          return;

        case "i": // Open import JSON modal
          interuptDown();
          setModalOpen("import-json");
          return;

        case "d": // Duplicate currently open/editing resume
          if (isResumeBeingEditing) {
            interuptDown();
            try {
              setAlertDialogOpen("duplicateResume", { id: resumeId });
            } catch (err) {}
          }
          return;

        case "[": // Set editor view to `form` only
          try {
            await execMenuAction("view-editor");
          } catch (err) {}
          return;
        case "]": // Set editor view to `preview` only
          try {
            await execMenuAction("view-preview");
          } catch (err) {}
          return;
        case "\\": // split editor into form & preview
          try {
            await execMenuAction("view-split");
          } catch (err) {}
          return;

        default:
        // No action is found for the key
      }
    }

    // Handle `editor` specifics shortcuts
    if (isResumeBeingEditing) {
      // Handle function key press actions
      // Rename currently open resume
      if (key === "f2") {
        try {
          await execMenuAction("rename-cv");
          interuptDown();
        } catch (err) {}
        return;
      }

      // Handle 'delete' and Ctl+Shift+D keys
      if (key === "delete" || (e.ctrlKey && e.shiftKey && key === "d")) {
        interuptDown();
        try {
          setAlertDialogOpen("deleteResume", { id: resumeId });
        } catch (err) {}
        return;
      }

      // Split editor into form and preview
      if (key === "|" && e.ctrlKey && e.shiftKey) {
        try {
          await execMenuAction("view-split");
        } catch (err) {}
        return;
      }

      // Show keyboard shortcuts
      if (e.target && !isTypingTarget(e?.target) && key === "?") {
        interuptDown();
        setModalOpen("keyboardShortcut");
        return;
      }
    }

    function interuptDown() {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => document.removeEventListener("keydown", handleKeyboard);
  }, []);
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

import type { ActionKey } from "@/constants/menubar";
import { useModalActions } from "@/store/modal";
import usePrintResume from "./usePrintResume";
import useDeleteResume from "./useDeleteResume";
import { useLocation, useSearchParams } from "wouter";
import { useEditorActions } from "@/features/editor/store";
import { useCommonActions, useResumeActions } from "@/store";
import useCreateDuplicateResume from "./useCreateDuplicateResume";
import useCreateResume from "./useCreateResume";
import { useSettingActions } from "@/store/setting";
import { useExportResume } from "./useExportResume";

export default function useMenuActions() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [_, navigate] = useLocation();

  const { toggleCommandCenter } = useCommonActions();
  const { resetEditor, setEditorSettings } = useEditorActions();
  const { setModalOpen } = useModalActions();
  const { toggleRenameResume, togglePreview, setPreviewId } =
    useCommonActions();
  const { updateResume } = useResumeActions();
  const { setViewSetting } = useSettingActions();
  const createResume = useCreateResume();
  const printResume = usePrintResume();
  const deleteResume = useDeleteResume();
  const handleCreateDuplicateResume = useCreateDuplicateResume(id);
  const { exportResume } = useExportResume();

  async function execMenuAction(actionKey: ActionKey) {
    switch (actionKey) {
      // File menu
      case "new-cv": // Create new resume
        try {
          const res = await createResume();
          if (res) {
            updateResume(res);
            navigate(`/editor?id=${res.id}`);
          }
        } catch (error) {
          console.log(error);
        }
        return;

      // create duplicate resume
      case "duplicate-cv":
        try {
          const resume = await handleCreateDuplicateResume();
          if (resume) {
            navigate(`/editor?id=${resume.id}`);
          }
        } catch (error) {
          console.log(error);
        }
        return;

      // Delete Resume
      case "delete-cv":
        if (id?.trim()) {
          try {
            await deleteResume(id);
            // Reset editor
            resetEditor();
            // Redirect to dashboard
            navigate("/");
          } catch (error) {}
        }
        return;

      // Rename current open resume
      case "rename-cv":
        toggleRenameResume();
        return;

      // import json
      case "import-json":
        return setModalOpen("import-json");

      // export json
      case "export-json":
        try {
          if (id?.trim()) {
            await exportResume(id);
          }
        } catch (error) {}
        return;

      // Print Menu
      case "print-pdf": // Print resume
      case "print-cv":
        printResume();
        return;

      // Open preview modal
      case "print-preview":
        if (id) {
          setPreviewId(id);
          togglePreview();
        }
        return;

      case "view-editor":
      case "view-split":
      case "view-preview":
        if (id) {
          if (actionKey === "view-editor") {
            setViewSetting({
              editorMode: "editor",
            });
          } else if (actionKey === "view-split") {
            setViewSetting({
              editorMode: "split",
            });
          } else if (actionKey === "view-preview") {
            setViewSetting({
              editorMode: "preview",
            });
          }
        }
        return;

      // Help section
      case "keyboard-shortcuts":
        setModalOpen("keyboardShortcut");
        return;

      case "command-palette":
        toggleCommandCenter();
        return;

      case "getting-started":
        setModalOpen("quickGuides");
        return;

      case "about":
        setModalOpen("about");
        return;

      // Other menu
      case "change-template": // Change resume template
        setEditorSettings({ showTemplatePicker: true });
        return;
      default:
    }
  }

  return { execMenuAction } as const;
}

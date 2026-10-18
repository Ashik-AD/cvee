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
import useExportResumes from "./useExportResumes";

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
  const { onExport } = useExportResumes();

  async function execMenuAction(actionKey: ActionKey) {
    switch (actionKey) {
      // File menu
      case "new-cv": // Create new resume
        const res = await createResume();
        if (res) {
          updateResume(res);
          navigate(`/editor?id=${res.id}`);
        }
        break;

      // create duplicate resume
      case "duplicate-cv":
        const resume = await handleCreateDuplicateResume();
        if (resume) {
          navigate(`/editor?id=${resume.id}`);
        }
        break;

      // Delete Resume
      case "delete-cv":
        if (id?.trim()) {
          await deleteResume(id);
          // Reset editor
          resetEditor();
          // Redirect to dashboard
          navigate("/");
        }
        break;

      // Rename current open resume
      case "rename-cv":
        toggleRenameResume();
        break;

      // import json
      case "import-json":
        setModalOpen("import-json");
        break;

      case "import-all-json":
        setModalOpen("import-all-json");
        break;

      // export json
      case "export-json":
        if (id?.trim()) {
          await exportResume(id);
        }
        break;

      // export json
      case "export-all-json":
        await onExport();
        break;

      // Print Menu
      case "print-pdf": // Print resume
      case "print-cv":
        printResume();
        break;

      // Open preview modal
      case "print-preview":
        if (id) {
          setPreviewId(id);
          togglePreview();
        }
        break;

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
        break;

      // Help section
      case "keyboard-shortcuts":
        setModalOpen("keyboardShortcut");
        break;

      case "command-palette":
        toggleCommandCenter();
        break;

      case "getting-started":
        setModalOpen("quickGuides");
        break;

      case "about":
        setModalOpen("about");
        break;

      // Other menu
      case "change-template": // Change resume template
        setEditorSettings({ showTemplatePicker: true });
        return;
      default:
    }
  }

  return { execMenuAction } as const;
}

import { FlexColumn, Grid } from "@/components/common/layout";
import EditorForm from "./components/EditorForm";
import Preview from "./components/Preview";
import { useSearchParams } from "wouter";
import { Activity, useEffect } from "react";
import useServices from "@/hooks/useServices";
import Toolbar from "./components/Toolbar";
import { useEditorActions, useEditorState } from "./store";
import RenameResume from "@/components/RenameResume";
import { useRenameResumeState } from "@/store/common";
import { useViewSettingState } from "@/store/setting";
import { cn } from "cn";
import MobileQuickActions from "./components/MobileQuickActions";
import { useWindowResize } from "@/hooks/useWindowResize";
import useMenuActions from "@/hooks/useMenuActions";
import ResumeTemplatePicker from "./components/TemplatePicker";
import { toast } from "@/components/ui/toast";

export default function Editor() {
  const [params] = useSearchParams();
  const resumeId = params.get("id");

  const { services } = useServices();
  const { resetEditor, setEditor } = useEditorActions();

  // fetch opened resume from database
  // and populate editor store
  useEffect(() => {
    if (resumeId) {
      services?.resumeSrv
        .getResumeById(resumeId)
        .then((resume: any) => {
          // Populate resume in the editor
          if (resume) {
            setEditor(resume);
          } else {
            toast.add({
              type: "warning",
              title: `Resume not found for ID: ${resumeId}`,
            });
          }
        })
        .catch((error) => {
          toast.add({
            title: error?.message,
            type: "error",
          });
        });
    }
  }, [resumeId]);

  // Rest editor state on unmount
  useEffect(() => {
    return () => {
      resetEditor();
    };
  }, []);

  return (
    <FlexColumn>
      <Toolbar />
      <EditorLayout />
      <ChangeResumeName id={resumeId} />
      <QuickActions />
      <ResumeTemplatePicker />
    </FlexColumn>
  );
}

function EditorPreview() {
  const {
    personalInfo,
    aboutMe,
    experiences,
    projects,
    educations,
    skills,
    meta,
  } = useEditorState();

  return (
    <Preview
      personalInfo={personalInfo}
      aboutMe={aboutMe}
      experiences={experiences}
      projects={projects}
      educations={educations}
      skills={skills}
      template={meta.template ?? "obsidian"}
    />
  );
}

function ChangeResumeName({ id }: { id: string | null }) {
  const { isRenameResume } = useRenameResumeState();
  if (!isRenameResume) return <></>;
  return <RenameResume id={id} />;
}

function EditorLayout() {
  const { mode } = useViewSettingState();

  return (
    <Grid
      className={cn(
        mode === "split" ? "md:grid-cols-2" : "md:grid-cols-1",
        "grid-cols-1 justify-center h-[calc(100svh-4rem)] overflow-y-auto scrollbar-thin pb-16 md:pb-0 print:h-auto! print:scrollbar-none!",
      )}
    >
      <Activity
        mode={mode === "editor" || mode === "split" ? "visible" : "hidden"}
      >
        <div className="editor-form-panel bg-neutral-900">
          <EditorForm />
        </div>
      </Activity>
      <Activity
        mode={mode === "preview" || mode === "split" ? "visible" : "hidden"}
      >
        <EditorPreview />
      </Activity>
    </Grid>
  );
}

function QuickActions() {
  const { execMenuAction } = useMenuActions();
  const { width } = useWindowResize();
  const isMediumScreen = width && width < 768;

  useEffect(() => {
    if (isMediumScreen) {
      execMenuAction("view-editor");
    } else {
      execMenuAction("view-split");
    }
  }, [isMediumScreen]);

  return (
    <Activity mode={isMediumScreen ? "visible" : "hidden"}>
      <MobileQuickActions />
    </Activity>
  );
}

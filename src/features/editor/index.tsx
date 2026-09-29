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
        mode === "split" ? "grid-cols-2" : "grid-cols-1",
        "justify-center",
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

function Editor() {
  const [params] = useSearchParams();
  const resumeId = params.get("id");
  const { services } = useServices();
  const { resetEditor, setEditor } = useEditorActions();

  // fetch opened resume from database
  // and populate editor store
  useEffect(() => {
    if (resumeId) {
      services?.editor
        .getResumeById(resumeId)
        .then((resume) => {
          // Populate resume in the editor
          if (resume) {
            console.log("Setting editor state with resume");
            setEditor(resume);
          } else {
            console.warn(`Resume not found for ID: ${resumeId}`);
          }
        })
        .catch(console.error);
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
    </FlexColumn>
  );
}

export default Editor;

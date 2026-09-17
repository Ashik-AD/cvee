import { FlexColumn, Grid } from "@/components/common/layout";
import EditorForm from "./components/EditorForm";
import Preview from "./components/Preview";
import { useSearchParams } from "wouter";
import { useEffect } from "react";
import useServices from "@/hooks/useServices";
import Toolbar from "./components/Toolbar";

function Editor() {
  const [params] = useSearchParams();
  const resumeId = params.get("id");
  const { services } = useServices();

  // fetch opened resume from database
  // and populate editor store
  useEffect(() => {
    if (resumeId) {
      services?.editor
        .getResumeById(resumeId)
        .then((resume) => {
          // Populate resume in the editor
          if (resume) {
            // setEditor(resume);
          } else {
            console.warn(`Resume not found for ID: ${resumeId}`);
          }
        })
        .catch(console.error);
    }
  }, [resumeId]);

  return (
    <FlexColumn>
      <Toolbar />
      <Grid className="grid-cols-2">
        <div className="editor-form-panel bg-neutral-900">
          <EditorForm />
        </div>
        <Preview />
      </Grid>
    </FlexColumn>
  );
}

export default Editor;

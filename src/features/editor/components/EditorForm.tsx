import { FlexColumn } from "@/components/common/layout";
import PersonalInfoSection from "./form/PersonalInfoSection";
import Summary from "./form/Summary";
import Experiences from "./form/Experiences";
import EducationSection from "./form/EducationSection";
import Projects from "./form/Projects";
import Skills from "./form/Skills";
import { useEffect, useEffectEvent, useRef } from "react";
import { useSearchParams } from "wouter";
import { useEditorState } from "../store";
import useServices from "@/hooks/useServices";
import { Accordion } from "@/components/ui/accordion";
import EditorSection from "@/components/common/EditorSection";

const SAVE_INTERVAL_MIL = 10_000; // 10 seconds

function EditorForm() {
  const timerRef = useRef<number | null>(null);
  const [params] = useSearchParams();
  const resumeId = params.get("id");
  const { services } = useServices();

  const editorState = useEditorState();

  const onSave = useEffectEvent(async () => {
    if (resumeId) {
      try {
        await services?.editor.update(resumeId, editorState);
        console.log("Saved data", editorState);
      } catch (error) {
        console.error("Failed save resume", error);
      }
    }
  });

  // Save resume on every  `SAVE_INTERVAL_MIL` interval
  useEffect(() => {
    if (resumeId) {
      timerRef.current = setInterval(onSave, SAVE_INTERVAL_MIL);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [resumeId, editorState]);

  return (
    <FlexColumn className="overflow-y-auto max-h-[calc(100dvh-4rem)] scrollbar-thin">
      <Accordion
        multiple
        defaultValue={["personalInfo", "summary", "exp", "pro", "skill", "edu"]}
      >
        <EditorSection title="Personal Info" id="personalInfo">
          <PersonalInfoSection />
        </EditorSection>

        <EditorSection title="Summary" id="summary">
          <Summary />
        </EditorSection>

        <EditorSection title="Experiences" id="exp">
          <Experiences />
        </EditorSection>

        <EditorSection title="Projects" id="pro">
          <Projects />
        </EditorSection>

        <EditorSection title="Skills" id="skill">
          <Skills />
        </EditorSection>

        <EditorSection title="Education" id="edu">
          <EducationSection />
        </EditorSection>
      </Accordion>
    </FlexColumn>
  );
}

export default EditorForm;

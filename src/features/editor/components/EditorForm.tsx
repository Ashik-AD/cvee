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
import {
  BriefcaseBusiness,
  GraduationCap,
  IdCard,
  ListMinus,
  SquareTerminal,
  Target,
} from "lucide-react";

const SAVE_INTERVAL_MIL = 2_000; // 2 seconds

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
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (resumeId) {
      timerRef.current = setTimeout(onSave, SAVE_INTERVAL_MIL);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [resumeId, editorState]);

  // Save final snap shot instantly before closing the editor form
  // useEffect(() => {
  //   return () => {
  //     if (timerRef.current) {
  //       clearInterval(timerRef.current);
  //     }
  //
  //     // Save last state of the editor before
  //     // closing the form
  //     console.log("Saving final changes before closing....");
  //     onSave()
  //       .then(() => {
  //         console.log("Changes saved successfully....");
  //       })
  //       .catch((err) => {
  //         console.error("Failed to save final changes: ", err);
  //       });
  //   };
  // }, []);

  return (
    <FlexColumn className="overflow-y-auto h-full md:max-h-[calc(100dvh-5rem)] scrollbar-thin">
      <Accordion
        multiple
        defaultValue={["personalInfo", "summary", "exp", "pro", "skill", "edu"]}
      >
        <EditorSection title="Personal Info" id="personalInfo" icon={IdCard}>
          <PersonalInfoSection />
        </EditorSection>

        <EditorSection title="Summary" id="summary" icon={ListMinus}>
          <Summary />
        </EditorSection>

        <EditorSection title="Experiences" id="exp" icon={BriefcaseBusiness}>
          <Experiences />
        </EditorSection>

        <EditorSection title="Projects" id="pro" icon={Target}>
          <Projects />
        </EditorSection>

        <EditorSection title="Skills" id="skill" icon={SquareTerminal}>
          <Skills />
        </EditorSection>

        <EditorSection title="Education" id="edu" icon={GraduationCap}>
          <EducationSection />
        </EditorSection>
      </Accordion>
    </FlexColumn>
  );
}

export default EditorForm;

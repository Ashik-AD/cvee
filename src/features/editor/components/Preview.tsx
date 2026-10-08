import type { ReactNode } from "react";
import { Flex } from "@/components/common/layout";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import CVTemplate, { type CVTemplates } from "@/components/templates";
import { useEditorSettings } from "../store";
import { calcPreviewDocsScaleLevel } from "@/utils/calcPreviewDocsScaleLevel";
import type { Education, Experience, PersonalInfo, Project } from "../types";

interface PreviewProps {
  personalInfo: PersonalInfo;
  aboutMe: string;
  experiences: Experience[];
  projects: Project[];
  educations: Education[];
  skills: string[];
  template: CVTemplates;
}

export default function Preview({
  personalInfo,
  aboutMe,
  experiences,
  projects,
  educations,
  skills,
  template,
}: PreviewProps) {
  return (
    <Flex className="p-8 overflow-auto max-h-[calc(100dvh-5rem)] scrollbar-none preview-wrapper">
      <PreviewCanvas>
        <CVTemplate
          type={template}
          personalInfo={personalInfo}
          aboutMe={aboutMe}
          experiences={experiences}
          projects={projects}
          educations={educations}
          skills={skills}
        />
      </PreviewCanvas>
    </Flex>
  );
}

function PreviewCanvas({ children }: { children: ReactNode }) {
  const { zoomLevel } = useEditorSettings();
  const scale = calcPreviewDocsScaleLevel(zoomLevel);
  return (
    <AspectRatio
      ratio={1 / 1.4142}
      className="bg-document h-fit w-full preview-content p-8 mx-auto"
      id="preview"
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "center",
      }}
    >
      {children}
    </AspectRatio>
  );
}

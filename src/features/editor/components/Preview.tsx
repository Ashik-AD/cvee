import type { ReactNode } from 'react';
import { Flex } from '@/components/common/layout';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import CVTemplate, { type CVTemplates } from '@/components/templates';
import { useEditorSettings } from '../store';
import { calcPreviewDocsScaleLevel } from '@/utils/calcPreviewDocsScaleLevel';
import type {
  Education,
  Experience,
  PersonalInfo,
  Project,
} from '@/lib/model/resume';
import { cn } from 'cn';

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
  const documentTitle = `${personalInfo?.name?.trim()}'s-resume`;

  return (
    <>
      <title>{documentTitle}</title>
      <Flex className="preview-wrapper max-h-[calc(100dvh-5rem)] scrollbar-none overflow-auto p-8">
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
    </>
  );
}

function PreviewCanvas({ children }: { children: ReactNode }) {
  const { zoomLevel, zoomToFit } = useEditorSettings();
  const scale = calcPreviewDocsScaleLevel(zoomLevel);
  return (
    <AspectRatio
      ratio={1 / 1.4142}
      className={cn(
        'bg-document h-fit w-full preview-content p-8 mx-auto origin-center',
        zoomToFit && 'transform-none! min-w-auto!',
      )}
      id="preview"
      style={{
        transform: `scale(${scale})`,
      }}
    >
      {children}
    </AspectRatio>
  );
}

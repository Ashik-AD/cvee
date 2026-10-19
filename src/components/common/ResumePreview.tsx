import Preview from '@/features/editor/components/Preview';
import { Flex } from './layout';
import { Button } from '../ui/button';
import { Pencil, Printer, X } from 'lucide-react';
import useGetResume from '@/hooks/useGetResume';
import { useCommonActions, useResumePreviewState } from '@/store';
import { Activity } from 'react';
import usePrintResume from '@/hooks/usePrintResume';
import { DEFAULT_TEMPLATE } from '@/constants/preview';

function PreviewContent({ previewId }: { previewId: string | null }) {
  const { resume } = useGetResume(previewId);
  const { clearPreviewId, togglePreview } = useCommonActions();
  const handlePrint = usePrintResume();

  if (!resume) return <></>;

  function handleClosePreview() {
    clearPreviewId();
    togglePreview();
  }
  const resumeTemplate = resume.meta?.template ?? DEFAULT_TEMPLATE;

  return (
    <>
      <Preview
        personalInfo={resume?.personalInfo}
        aboutMe={resume?.aboutMe}
        experiences={resume?.experiences}
        projects={resume?.projects}
        educations={resume?.educations}
        skills={resume?.skills}
        template={resumeTemplate}
      />

      <Flex className="bg-neutral-111111 hidden-on-print absolute bottom-1 overflow-hidden rounded-full p-1 shadow-lg shadow-emerald-700">
        <Button type="button" variant="ghost" onClick={handlePrint}>
          <Printer />
          Print
        </Button>
        <Button type="button" variant="ghost">
          <Pencil />
          Edit
        </Button>
        <Button type="button" variant="ghost" onClick={handleClosePreview}>
          <X />
          Close
        </Button>
      </Flex>
    </>
  );
}

function ResumePreview() {
  const { previewId, isShowPreview } = useResumePreviewState();
  return (
    <Activity mode={isShowPreview ? 'visible' : 'hidden'}>
      <Flex className="bg-document-foreground fixed inset-0 min-h-screen w-screen scrollbar-none items-center justify-center overflow-y-auto">
        <PreviewContent previewId={previewId} />
      </Flex>
    </Activity>
  );
}

export default ResumePreview;

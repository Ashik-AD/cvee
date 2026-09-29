import Preview from "@/features/editor/components/Preview";
import { Flex } from "./layout";
import { Button } from "../ui/button";
import { Pencil, Printer, X } from "lucide-react";
import useGetResume from "@/hooks/useGetResume";
import { useCommonActions, useResumePreviewState } from "@/store";
import { Activity } from "react";
import usePrintResume from "@/hooks/usePrintResume";

function PreviewContent({ previewId }: { previewId: string | null }) {
  const { resume } = useGetResume(previewId);
  const { clearPreviewId, togglePreview } = useCommonActions();
  const handlePrint = usePrintResume();

  if (!resume) return <></>;

  function handleClosePreview() {
    clearPreviewId();
    togglePreview();
  }

  return (
    <>
      <Preview
        personalInfo={resume?.personalInfo}
        aboutMe={resume?.aboutMe}
        experiences={resume?.experiences}
        projects={resume?.projects}
        educations={resume?.educations}
        skills={resume?.skills}
      />

      <Flex className="absolute bottom-1 bg-neutral-111111 rounded-full shadow-lg overflow-hidden shadow-emerald-700 p-1 hidden-on-print">
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
    <Activity mode={isShowPreview ? "visible" : "hidden"}>
      <Flex className="fixed bg-document-foreground min-h-screen w-screen items-center justify-center inset-0 overflow-y-auto scrollbar-none">
        <PreviewContent previewId={previewId} />
      </Flex>
    </Activity>
  );
}

export default ResumePreview;

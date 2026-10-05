import AddNewResumeCard from "@/components/cards/AddNewResumeCard";
import { ResumeCard } from "@/components/cards/ResumeCard";
import { FlexColumn, Grid } from "@/components/common/layout";
import Toolbar from "./components/Toolbar";
import { useCommonActions, useResumeState } from "@/store";
import useDeleteResume from "@/hooks/useDeleteResume";
import usePrintResume from "@/hooks/usePrintResume";
import { getResumeStatus } from "@/utils/getResumeStatus";

export default function Dashbord() {
  const { resumes } = useResumeState();
  const { setPreviewId, togglePreview } = useCommonActions();
  const deleteResume = useDeleteResume();
  const print = usePrintResume();

  async function handleDeleteResume(id: string) {
    try {
      await deleteResume(id);
    } catch (error) {
      console.error(error);
    }
  }

  function handlePreviewResume(id: string) {
    setPreviewId(id);
    togglePreview();
  }

  function handlePrint(id: string) {
    handlePreviewResume(id);
    setTimeout(print, 1000);
  }

  if (!resumes?.length) {
    return (
      <FlexColumn className="h-full w-full items-center justify-center">
        <FlexColumn>
          <AddNewResumeCard />
        </FlexColumn>
      </FlexColumn>
    );
  }

  return (
    <div className="w-full px-4 lg:px-12 py-4 inline-flex flex-col justify-start items-start gap-4">
      <div className="sticky top-0 bg-neutral-0E0E0E w-full">
        <Toolbar />
      </div>

      <Grid className="sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2">
        <AddNewResumeCard />
        {resumes?.map((resume) => {
          const resumeStatus = getResumeStatus(resume);
          return (
            <ResumeCard
              key={resume.id}
              id={resume.id}
              title={resume.meta.title ?? ""}
              description={resume.meta.description ?? ""}
              createdAt={resume.meta.createdAt}
              updatedAt={resume.meta.updatedAt}
              onDelete={handleDeleteResume}
              onPreview={handlePreviewResume}
              onPrint={handlePrint}
              status={resumeStatus}
            />
          );
        })}
      </Grid>
    </div>
  );
}

import AddNewResumeCard from "@/components/cards/AddNewResumeCard";
import { FlexColumn } from "@/components/common/layout";
import Toolbar from "./components/Toolbar";
import { useCommonActions, useResumeState } from "@/store";
import useDeleteResume from "@/hooks/useDeleteResume";
import usePrintResume from "@/hooks/usePrintResume";
import { useMemo } from "react";
import GridView from "./components/GridView";
import ListView from "./components/ListView";
import { useDashboardDataView } from "@/store/common";

export type ViewMode = "grid" | "list";

export default function Dashbord() {
  const { resumes } = useResumeState();
  const { setPreviewId, togglePreview } = useCommonActions();
  const { dataView } = useDashboardDataView();
  const { setDashboardDataView } = useCommonActions();
  const deleteResume = useDeleteResume();
  const print = usePrintResume();

  // sort resume by last modified newest --> oldest
  const sortedResumes = useMemo(() => {
    if (!resumes?.length) return [];

    return [...resumes].sort((a, b) => {
      const dateA = new Date(
        a.meta?.updatedAt ?? a.meta?.createdAt ?? 0,
      ).getTime();

      const dateB = new Date(
        b.meta?.updatedAt ?? b.meta?.createdAt ?? 0,
      ).getTime();

      return dateB - dateA;
    });
  }, [resumes]);

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

  function handleChangeViewMode(mode: ViewMode) {
    setDashboardDataView(mode);
  }

  if (!resumes?.length) {
    return (
      <FlexColumn className="h-full w-full items-center justify-center pt-10">
        <FlexColumn>
          <AddNewResumeCard />
        </FlexColumn>
      </FlexColumn>
    );
  }
  const resumeCount = sortedResumes?.length;

  return (
    <div className="w-full lg:px-12 pb-4 inline-flex flex-col justify-start items-start gap-4 h-full max-h-[100svh-40px] overflow-y-auto scrollbar-thin">
      <div className="sticky top-0 bg-neutral-0E0E0E w-full py-2 shadow-lg px-4">
        <Toolbar
          viewMode={dataView}
          onViewChange={handleChangeViewMode}
          resumeCount={resumeCount}
        />
      </div>
      <div className="px-4 w-full">
        {sortedResumes?.length > 0 &&
          (dataView === "grid" ? (
            <GridView
              resumes={sortedResumes}
              onDelete={handleDeleteResume}
              onPrint={handlePrint}
              onPreview={handlePreviewResume}
            />
          ) : (
            <ListView
              resumes={sortedResumes}
              onDelete={handleDeleteResume}
              onPrint={handlePrint}
              onPreview={handlePreviewResume}
            />
          ))}
      </div>
    </div>
  );
}

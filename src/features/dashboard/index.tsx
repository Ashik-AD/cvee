import AddNewResumeCard from '@/components/cards/AddNewResumeCard';
import { FlexColumn } from '@/components/common/layout';
import Toolbar from './components/Toolbar';
import { useCommonActions, useResumeState } from '@/store';
import useDeleteResume from '@/hooks/useDeleteResume';
import usePrintResume from '@/hooks/usePrintResume';
import { useMemo } from 'react';
import GridView from './components/GridView';
import ListView from './components/ListView';
import { useDashboardDataView } from '@/store/common';

export type ViewMode = 'grid' | 'list';

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

  if (resumes && resumes?.length === 0) {
    return (
      <FlexColumn className="h-full w-full items-center justify-center pt-16">
        <FlexColumn>
          <AddNewResumeCard />
        </FlexColumn>
      </FlexColumn>
    );
  }
  const resumeCount = sortedResumes?.length;

  return (
    <div className="inline-flex h-full max-h-[100svh-40px] w-full scrollbar-thin flex-col items-start justify-start gap-4 overflow-y-auto pb-4 lg:px-12">
      <div className="bg-neutral-0E0E0E sticky top-0 w-full px-4 py-2 shadow-lg">
        <Toolbar
          viewMode={dataView}
          onViewChange={handleChangeViewMode}
          resumeCount={resumeCount}
        />
      </div>
      <div className="w-full px-4">
        {sortedResumes?.length > 0 &&
          (dataView === 'grid' ? (
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

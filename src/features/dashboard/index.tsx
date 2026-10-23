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
import { useExportResume } from '@/hooks/useExportResume';
import useCreateDuplicateResume from '@/hooks/useCreateDuplicateResume';
import { toast } from '@/components/ui/toast';
import ImportResumeJSONCrard from '@/components/cards/ImportResumeJSONCard';

export type ViewMode = 'grid' | 'list';

export default function Dashbord() {
  const { resumes } = useResumeState();
  const { setPreviewId, togglePreview } = useCommonActions();
  const { dataView } = useDashboardDataView();
  const { setDashboardDataView } = useCommonActions();
  const deleteResume = useDeleteResume();
  const print = usePrintResume();
  const { exportResume } = useExportResume();
  const createDuplicateResume = useCreateDuplicateResume();

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
      toast.add({
        type: 'error',
        title:
          (error as Error).message || 'Failed to delete. Please try again.',
      });
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

  async function handleCreateDuplicateResume(id: string) {
    try {
      await createDuplicateResume(id);
    } catch (error) {
      let err = error as Error;
      let msg = err.message || 'Failed to create duplicate. Please try again.';
      toast.add({
        type: 'error',
        title: msg,
      });
    }
  }

  if (resumes && resumes?.length === 0) {
    return (
      <FlexColumn className="h-full w-full items-center justify-center pt-16">
        <FlexColumn className="gap-2">
          <AddNewResumeCard />
          <div className="text-muted-foreground text-center font-bold">OR</div>
          <ImportResumeJSONCrard />
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
              exportAsJSON={exportResume}
              onDuplicate={handleCreateDuplicateResume}
            />
          ) : (
            <ListView
              resumes={sortedResumes}
              onDelete={handleDeleteResume}
              onPrint={handlePrint}
              onPreview={handlePreviewResume}
              exportAsJSON={exportResume}
              onDuplicate={handleCreateDuplicateResume}
            />
          ))}
      </div>
    </div>
  );
}

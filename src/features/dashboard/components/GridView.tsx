import AddNewResumeCard from '@/components/cards/AddNewResumeCard';
import { ResumeCard } from '@/components/cards/ResumeCard';
import { Grid } from '@/components/common/layout';
import type { ResumePopulate } from '@/lib/model/resume';
import { getResumeStatus } from '@/utils/getResumeStatus';

type GridViewProps = {
  resumes: ResumePopulate[];
  onDelete: (id: string) => void;
  onPreview: (id: string) => void;
  onPrint: (id: string) => void;
};

function GridView({ resumes, onDelete, onPrint, onPreview }: GridViewProps) {
  return (
    <Grid className="gap-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
      <AddNewResumeCard />
      {resumes?.map((resume) => {
        const id = resume.id;
        const resumeStatus = getResumeStatus(resume);
        return (
          <ResumeCard
            key={id}
            id={id}
            title={resume.meta.title ?? ''}
            description={resume.meta.description ?? ''}
            createdAt={resume.meta?.createdAt}
            updatedAt={resume.meta?.updatedAt}
            onDelete={() => onDelete(id)}
            onPreview={() => onPreview(id)}
            onPrint={() => onPrint(id)}
            status={resumeStatus}
          />
        );
      })}
    </Grid>
  );
}

export default GridView;

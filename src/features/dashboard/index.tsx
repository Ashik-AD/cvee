import AddNewResumeCard from "@/components/cards/AddNewResumeCard";
import { ResumeCard } from "@/components/cards/ResumeCard";
import { Grid } from "@/components/common/layout";
import Toolbar from "./components/Toolbar";
import { useResumeState } from "@/store";

export default function Dashbord() {
  const { resumes } = useResumeState();
  console.log(resumes)

  return (
    <div className="w-full px-12 py-4 inline-flex flex-col justify-start items-start gap-4">
      <Toolbar />

      <Grid className="sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2">
        <AddNewResumeCard />
        {resumes?.map((resume) => {
          return (
            <ResumeCard
              key={resume.id}
              id={resume.id}
              title={resume.meta.title}
              description={resume.meta.description}
              createdAt={resume.meta.createdAt}
              updatedAt={resume.meta.updatedAt}
            />
          );
        })}
      </Grid>
    </div>
  );
}

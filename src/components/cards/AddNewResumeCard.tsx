import type { Resume } from "@/features/editor/types";
import useServices from "@/hooks/useServices";
import { Button } from "../ui/button";

function AddNewResumeCard() {
  const { services } = useServices();

  async function handleCreateNew() {
    try {
      const payload: Resume = {
        personalInfo: {
          name: "",
          email: "",
          role: "",
          linkedin: "",
          address: "",
          contactNo: "",
          github: "",
        },
        aboutMe: "",
        experiences: [],
        skills: [],
        projects: [],
        educations: [],
        addons: {},
      };
      const res = await services?.editor.createNewResume(payload);
      alert("New resume created successfully");
      console.log(res);
    } catch (err) {
      console.log("Failed create new resume: ", err);
    }
  }

  return (
    <div className="self-stretch min-h-72 px-3 py-20 rounded-sm outline -outline-offset-1 outline-neutral-800 bg-neutral-700 inline-flex flex-col justify-center items-center">
      <div className="w-10 h-11 pb-1.5 flex flex-col justify-start items-start">
        <div className="size-10 bg-neutral-800 rounded-sm inline-flex justify-center items-center">
          <div className="size- inline-flex flex-col justify-start items-center">
            <div className="size-3 bg-Color-Neutral-E5E2E1" />
          </div>
        </div>
      </div>
      <div className="size- flex flex-col justify-start items-center">
        <div className="text-center justify-center text-white text-base font-medium font-['Geist'] leading-6">
          Create new CV
        </div>
      </div>
      <div className="size- max-w-80 pt-1 flex flex-col justify-start items-start">
        <div className="size- max-w-80 px-2.5 flex flex-col justify-start items-center">
          <div className="text-center justify-center text-Color-Neutral-8E9192 text-xs font-normal font-['Geist'] leading-5">
            Start from scratch or choose from 6 ATS-optimized
            <br />
            developer templates.
          </div>
        </div>
      </div>
      <div>
        <Button onClick={handleCreateNew}>+ New Document</Button>
      </div>
    </div>
  );
}

export default AddNewResumeCard;

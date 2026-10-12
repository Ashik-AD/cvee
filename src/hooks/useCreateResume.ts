import type { Resume } from "@/lib/model/resume";
import useServices from "./useServices";
import type { ResumePopulate } from "@/lib/model/resume";

export default function useCreateResume() {
  const { services } = useServices();

  return async function handleCreateNew(
    resume?: Partial<Resume>,
    title?: string,
  ): Promise<ResumePopulate | undefined> {
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
      ...resume,
    };
    const res = await services?.resumeSrv.createNewResume(payload, { title });
    return res;
  };
}

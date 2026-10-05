import type { Resume } from "@/features/editor/types";
import useServices from "./useServices";
import type { ResumePopulate } from "@/lib/service/editor";

export default function useCreateResume() {
  const { services } = useServices();

  async function handleCreateNew(
    resume?: Partial<Resume>,
    title?: string,
  ): Promise<ResumePopulate | undefined> {
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
        ...resume,
      };
      const res = await services?.editor.createNewResume(payload, { title });
      return res;
    } catch (err) {
      console.log(err);
    }
  }
  return handleCreateNew;
}

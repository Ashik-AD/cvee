import type {
  Experience,
  PersonalInfo,
  Project,
  Resume,
} from "@/features/editor/types";
import type { ResumePopulate } from "@/lib/service/editor";

/**
 * Check resume completeness
 * @param resume ResumePopulate
 * @return draft | inProgress | complete
 **/
export function getResumeStatus(resume: Resume | ResumePopulate) {
  const personalInfosExist = hasRequiredPersonalInfo(resume.personalInfo);
  const experienceExist = hasExperiences(resume.experiences);
  const projectExist = hasProjects(resume.projects);
  const aboutMeExist = resume.aboutMe?.trim().length > 0;
  const skillExist = resume.skills?.length > 0;
  // Check for completeness
  if (
    personalInfosExist &&
    aboutMeExist &&
    experienceExist &&
    projectExist &&
    skillExist
  )
    return "complete";
  if (
    personalInfosExist &&
    aboutMeExist &&
    experienceExist &&
    skillExist &&
    !projectExist
  )
    return "inProgress";
  return "draft";
}

function hasRequiredPersonalInfo(info: PersonalInfo) {
  return info.name?.trim() &&
    info.role?.trim() &&
    info.email?.trim() &&
    info.contactNo?.trim() &&
    info.linkedin?.trim() &&
    info.github?.trim()
    ? true
    : false;
}

function hasExperiences(experiences: Experience[]) {
  if (!experiences?.length) return false;
  return experiences.every((exp) =>
    exp.role?.trim() &&
    exp.duration?.trim() &&
    exp.companyName?.trim() &&
    exp.description?.[0]?.trim()
      ? true
      : false,
  );
}

function hasProjects(projects: Project[]) {
  if (!projects?.length) return false;
  return projects.every((proj) =>
    proj?.name.trim() &&
    proj?.link.trim() &&
    proj.description?.[0]?.trim()
      ? true
      : false,
  );
}

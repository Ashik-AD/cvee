export type PersonalInfo = {
  name: string;
  email: string;
  contactNo: string;
  address: string;
  github: string;
  linkedin: string;
  role: string;
};

export type Experience = {
  companyName: string;
  role: string;
  duration: string;
  description: string[];
};

export type Project = {
  name: string;
  link: string;
  repoLink: string;
  description: string[];
};

export type Education = {
  institute: string;
  course: string;
  duration: string;
  grade: string;
};

export type Resume = {
  personalInfo: PersonalInfo;
  aboutMe: string;
  experiences: Experience[];
  skills: string[];
  projects: Project[];
  educations: Education[];
  addons: Record<string, unknown>;
};

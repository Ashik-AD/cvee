import type { ResumePopulate } from "@/lib/model/resume";

export function normalizeJsonToExport(json: string) {
  let resume: ResumePopulate = JSON.parse(json ?? {});

  for (const key in resume.personalInfo) {
    const typedKey = key as keyof typeof resume.personalInfo;
    resume.personalInfo[typedKey] = resume.personalInfo[typedKey]?.trim();
  }

  resume.aboutMe = resume.aboutMe.trim();

  resume.experiences = resume.experiences.map((exp) => {
    const normalize = newLineToArray(exp.description);
    return {
      ...exp,
      companyName: exp.companyName?.trim(),
      role: exp.role?.trim(),
      duration: exp.duration?.trim(),
      description: normalize,
    };
  });

  resume.projects = resume.projects.map((pro) => {
    const normalize = newLineToArray(pro.description);
    return {
      ...pro,
      name: pro.name?.trim(),
      repoLink: pro.repoLink?.trim(),
      link: pro.link?.trim(),
      description: normalize,
    };
  });

  resume.educations = resume.educations.map((ed) => ({
    ...ed,
    institute: ed.institute?.trim(),
    duration: ed.duration?.trim(),
    course: ed.course?.trim(),
    grade: Number(ed.grade),
  }));

  return resume;
}

export function parseImportedJSON(json: string) {
  let resume: ResumePopulate = JSON.parse(json ?? {});

  for (const key in resume.personalInfo) {
    const typedKey = key as keyof typeof resume.personalInfo;
    resume.personalInfo[typedKey] = resume.personalInfo[typedKey]?.trim();
  }

  resume.aboutMe = resume.aboutMe.trim();

  resume.experiences = resume.experiences.map((exp) => {
    const normalize = arrayToNewLineStr(exp.description);
    return {
      ...exp,
      companyName: exp.companyName?.trim(),
      role: exp.role?.trim(),
      duration: exp.duration?.trim(),
      description: normalize,
    };
  });

  resume.projects = resume.projects.map((pro) => {
    const normalize = arrayToNewLineStr(pro.description);
    return {
      ...pro,
      name: pro.name?.trim(),
      repoLink: pro.repoLink?.trim(),
      link: pro.link?.trim(),
      description: normalize,
    };
  });

  resume.educations = resume.educations.map((ed) => ({
    ...ed,
    institute: ed.institute?.trim(),
    duration: ed.duration?.trim(),
    course: ed.course?.trim(),
    grade: Number(ed.grade),
  }));

  return resume;
}

function newLineToArray(str: string | Array<string>) {
  if (typeof str === "string") {
    return str.split("\n-")?.map((str) => str?.trim());
  }
  return str.reduce<string[]>((ac, cur) => {
    const splitedStrs = cur?.split("\n-")?.map((str) => str.trim());
    return [...(ac ?? []), ...splitedStrs];
  }, []);
}

function arrayToNewLineStr(str: string | Array<string>) {
  if (typeof str === "string") {
    return str;
  }
  return str.concat("\n- ");
}

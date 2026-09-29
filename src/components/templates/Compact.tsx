import { Code, Globe, Mail, MapPin, Phone } from "lucide-react";
import type { TemplateProps } from ".";
import { Contact, SectionTitle, splitDescription } from "./Shared";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";

export function Compact({
  personalInfo,
  aboutMe,
  experiences,
  projects,
  educations,
  skills,
}: TemplateProps) {
  return (
    <table className="w-full border-collapse text-neutral-900">
      <tbody>
        {/* Header */}
        <tr>
          <td colSpan={2} className="pb-5">
            <table className="w-full">
              <tbody>
                <tr>
                  <td>
                    <h1 className="text-3xl font-bold tracking-tight">
                      {personalInfo.name}
                    </h1>

                    <p className="mt-1 text-sm font-medium">
                      {personalInfo.role}
                    </p>
                  </td>

                  <td className="text-right align-bottom">
                    <div className="space-y-1 text-[9px] font-mono">
                      <Contact icon={Mail}>
                        <a
                          href={`mailto:${personalInfo.email}`}
                          className="underline"
                        >
                          {personalInfo.email}
                        </a>
                      </Contact>
                      <br />
                      <Contact icon={IconBrandGithub}>
                        <a
                          href={`https://github.com/${personalInfo.github}`}
                          target="_blank"
                          className="underline"
                        >
                          github.com/{personalInfo.github}
                        </a>
                      </Contact>
                      <br />
                      <Contact icon={IconBrandLinkedin}>
                        <a
                          href={`https://linkedin.com/in/${personalInfo.linkedin}`}
                          target="_blank"
                          className="underline"
                        >
                          linkedin.com/in/{personalInfo.linkedin}
                        </a>
                      </Contact>
                      <br />
                      <Contact icon={Phone}>{personalInfo.contactNo}</Contact>
                      <br />
                      <Contact icon={MapPin}>{personalInfo.address}</Contact>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>

        {/* Summary */}
        {aboutMe && (
          <tr>
            <td colSpan={2} className="border-y border-neutral-300 py-4">
              <p className="text-[10px] leading-5">{aboutMe}</p>
            </td>
          </tr>
        )}

        {/* Two-column body */}
        <tr>
          {/* Main */}
          <td className="w-[68%] pr-5 pt-5 align-top">
            <SectionTitle>Experience</SectionTitle>

            <table className="mt-3 w-full">
              <tbody>
                {experiences?.map((experience, index) => (
                  <tr key={index}>
                    <td className="pb-4">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-xs font-bold">
                            {experience.companyName}
                          </h3>

                          <p className="mt-0.5 text-[10px] font-medium">
                            {experience.role}
                          </p>
                        </div>

                        <span className="text-[9px] font-mono">
                          {experience.duration}
                        </span>
                      </div>

                      <ul className="mt-2 space-y-1 pl-3 text-[9px] leading-4">
                        {splitDescription(
                          experience.description.toString(),
                        ).map((item, i) => (
                          <li key={i} className="list-disc">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pt-2">
              <SectionTitle>Projects</SectionTitle>

              <table className="mt-3 w-full">
                <tbody>
                  {projects?.map((project, index) => (
                    <tr key={index}>
                      <td className="pb-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xs font-bold">{project.name}</h3>

                          <div className="flex gap-2 text-[8px]">
                            {project.link && (
                              <span className="inline-flex items-center gap-1">
                                <Globe className="size-3" />
                                Website
                              </span>
                            )}

                            {project.repoLink && (
                              <span className="inline-flex items-center gap-1">
                                <Code className="size-3" />
                                Source
                              </span>
                            )}
                          </div>
                        </div>

                        <ul className="mt-2 space-y-1 pl-3 text-[9px] leading-4">
                          {splitDescription(
                            project.description?.toString(),
                          ).map((item, i) => (
                            <li key={i} className="list-disc">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </td>

          {/* Supporting */}
          <td className="w-[32%] pl-5 pt-5 align-top">
            <SectionTitle>Skills</SectionTitle>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {skills?.map((skill) => (
                <span
                  key={skill}
                  className="border border-neutral-300 px-2 py-1 text-[8px]"
                >
                  {skill}
                </span>
              ))}
            </div>

            {educations && educations?.length > 0 && (
              <div className="mt-6">
                <SectionTitle>Education</SectionTitle>

                <table className="mt-3 w-full">
                  <tbody>
                    {educations.map((education, index) => (
                      <tr key={index}>
                        <td className="pb-4">
                          <h3 className="text-xs font-bold">
                            {education.course}
                          </h3>

                          <p className="text-[9px]">{education.institute}</p>

                          <p className="mt-1 text-[9px] font-mono">
                            {education.duration}
                          </p>

                          {education.grade && (
                            <p className="text-[9px] font-mono">
                              {education.grade}
                            </p>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

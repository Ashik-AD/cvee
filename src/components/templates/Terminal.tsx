import { Code, Globe, Mail, MapPin, Phone } from "lucide-react";
import type { TemplateProps } from ".";
import { Contact, splitDescription } from "./Shared";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";

export function Terminal({
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
          <td className="pb-5">
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
                          rel="noreferrer"
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
                          rel="noreferrer"
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
            <td className="border-y border-neutral-300 py-4">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="w-[10%] align-top">
                      <span className="text-[9px] font-mono">$ about</span>
                    </td>

                    <td>
                      <p className="text-[10px] leading-5">{aboutMe}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        )}

        {/* Main workspace */}
        <tr>
          <td className="pt-5">
            <table className="w-full border-collapse">
              <tbody>
                <tr>
                  {/* Experience */}
                  <td className="w-1/2 border-r border-neutral-300 pr-5 align-top">
                    <span className="text-[9px] font-mono">
                      $ git log --experience
                    </span>

                    <table className="mt-3 w-full">
                      <tbody>
                        {experiences?.map((experience, index) => (
                          <tr key={index}>
                            <td className="pb-5">
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
                  </td>

                  {/* Projects */}
                  <td className="w-1/2 pl-5 align-top">
                    <span className="text-[9px] font-mono">
                      $ ls ./projects
                    </span>

                    <table className="mt-3 w-full">
                      <tbody>
                        {projects?.map((project, index) => (
                          <tr key={index}>
                            <td className="pb-5">
                              <div className="flex flex-col justify-between">
                                <h3 className="text-xs font-bold">
                                  {project.name}
                                </h3>

                                <div className="flex gap-2 text-[8px]">
                                  {project.link && (
                                    <a
                                      href={project.link}
                                      className="inline-flex items-center gap-1 underline"
                                    >
                                      <Globe className="size-3" />
                                      {project.link}
                                    </a>
                                  )}

                                  {project.repoLink && (
                                    <a
                                      href={project.repoLink}
                                      className="inline-flex items-center gap-1 underline"
                                    >
                                      <Code className="size-3" />
                                      {project.repoLink}
                                    </a>
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
                  </td>
                </tr>

                {/* Supporting information */}
                <tr>
                  {/* Skills */}
                  <td className="border-r border-neutral-300 pr-5 pt-3 align-top">
                    <span className="text-[9px] font-mono">$ echo $SKILLS</span>

                    <div className="mt-3 flex flex-wrap gap-1">
                      {skills?.map((skill) => (
                        <span key={skill} className="px-0.5 py-0.5 text-[8px]">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Education */}
                  <td className="pl-5 pt-3 align-top">
                    <span className="text-[9px] font-mono">
                      $ cat education.log
                    </span>

                    {educations && educations.length > 0 && (
                      <table className="mt-3 w-full">
                        <tbody>
                          {educations.map((education, index) => (
                            <tr key={index}>
                              <td className="pb-4">
                                <h3 className="text-xs font-bold">
                                  {education.course}
                                </h3>

                                <p className="text-[9px]">
                                  {education.institute}
                                </p>

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
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

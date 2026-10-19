import { Mail, MapPin, Phone } from 'lucide-react';
import type { TemplateProps } from '.';
import { Contact, ProjectLink, SectionTitle, splitDescription } from './Shared';
import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';

export function Obsidian({
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
                    <div className="space-y-1 font-mono text-[9px]">
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
            <td className="border-y border-neutral-300 py-4">
              <p className="text-[10px] leading-5">{aboutMe}</p>
            </td>
          </tr>
        )}

        {/* Experience */}
        <tr>
          <td className="pt-5">
            <SectionTitle>Experience</SectionTitle>

            <table className="mt-3 w-full">
              <tbody>
                {experiences?.map((experience, index) => (
                  <tr
                    key={`${experience.duration}_${experience.companyName}_${index}`}
                  >
                    <td className="pb-4 align-top">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-xs font-bold">
                            {experience.companyName}
                          </h3>

                          <p className="mt-0.5 text-[10px] font-medium">
                            {experience.role}
                          </p>
                        </div>

                        <span className="font-mono text-[9px]">
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
        </tr>

        {/* Projects */}
        <tr>
          <td className="pt-2">
            <SectionTitle>Projects</SectionTitle>

            <table className="mt-3 w-full">
              <tbody>
                {projects?.map((project, index) => (
                  <tr key={index}>
                    <td className="pb-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-bold">{project.name}</h3>

                        <div className="flex gap-2 text-[8px]">
                          <ProjectLink
                            website={project.link}
                            repo={project.repoLink}
                          />
                        </div>
                      </div>

                      <ul className="mt-2 space-y-1 pl-3 text-[9px] leading-4">
                        {splitDescription(project.description?.toString()).map(
                          (item, i) => (
                            <li key={i} className="list-disc">
                              {item}
                            </li>
                          ),
                        )}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </td>
        </tr>

        {/* Skills */}
        <tr>
          <td className="pt-2">
            <SectionTitle>Skills</SectionTitle>

            <div className="mt-3 flex flex-wrap gap-1">
              {skills?.map((skill) => (
                <span key={skill} className="px-0.5 py-0.5 text-[8px]">
                  {skill}
                </span>
              ))}
            </div>
          </td>
        </tr>

        {/* Education */}
        {educations && educations?.length > 0 && (
          <tr>
            <td className="pt-5">
              <SectionTitle>Education</SectionTitle>

              <table className="mt-3 w-full">
                <tbody>
                  {educations?.map((education, index) => (
                    <tr key={index}>
                      <td>
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-xs font-bold">
                              {education.course}
                            </h3>

                            <p className="text-[9px]">{education.institute}</p>
                          </div>

                          <div className="text-right font-mono text-[9px]">
                            {education.duration}

                            {education.grade && <div>{education.grade}</div>}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

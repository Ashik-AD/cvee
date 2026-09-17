import { Flex, FlexColumn } from "@/components/common/layout";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import React from "react";
import {
  useEditorPersonalInfo,
  useEditorAboutMe,
  useEditorExperiences,
  useEditorProjects,
  useEditorEducations,
  useEditorSkills,
} from "../store";
import { Badge } from "@/components/ui/badge";
import { Code, Globe } from "lucide-react";

function Preview() {
  const personalInfo = useEditorPersonalInfo();
  const aboutMe = useEditorAboutMe();
  const experiences = useEditorExperiences();
  const projects = useEditorProjects();
  const educations = useEditorEducations();
  const skills = useEditorSkills();

  const contactItems = [
    personalInfo.email,
    personalInfo.contactNo,
    personalInfo.github,
    personalInfo.linkedin,
    personalInfo.address,
  ].filter(Boolean);

  return (
    <Flex className="p-8 overflow-y-auto max-h-[calc(100dvh-4rem)] scrollbar-none justify-center preview-wrapper">
      <AspectRatio
        ratio={1 / 1.4142}
        className="bg-document h-fit w-full preview-content p-8"
        id="preview"
      >
        <table className="w-full border-collapse">
          <tbody className="w-full">
            {/* Header Section */}
            <tr className="w-full">
              <td className="w-full pb-5 border-b border-document-guide align-top">
                <FlexColumn className="justify-start items-start gap-1">
                  <FlexColumn className="justify-start items-start">
                    <h1 className="justify-center text-document-heading text-3xl font-bold font-sans leading-tight">
                      {personalInfo.name || "Your Name"}
                    </h1>
                  </FlexColumn>
                  <FlexColumn className="justify-start items-start">
                    <div className="justify-center text-document-muted text-sm font-medium font-sans leading-5">
                      {personalInfo.role || "Your Role"}
                    </div>
                  </FlexColumn>
                  <div className="mt-1">
                    <Flex className="flex-wrap items-center gap-x-2 gap-y-1 text-document-muted text-xs font-normal font-mono leading-5">
                      {contactItems.map((item, index) => (
                        <React.Fragment key={index}>
                          <span>{item}</span>
                          {index < contactItems.length - 1 && <span>·</span>}
                        </React.Fragment>
                      ))}
                    </Flex>
                  </div>
                </FlexColumn>
              </td>
            </tr>

            {/* Summary Section */}
            {aboutMe && (
              <tr className="w-full">
                <td className="w-full pt-1 pb-4 border-b border-document-guide align-top">
                  <FlexColumn className="justify-start items-start gap-2">
                    <p className="text-document-foreground text-xs font-normal font-sans leading-5 whitespace-pre-wrap text-left">
                      {aboutMe?.trim()}
                    </p>
                  </FlexColumn>
                </td>
              </tr>
            )}

            {/* Experience Section */}
            {experiences.length > 0 && experiences[0].companyName && (
              <tr className="w-full">
                <td className="w-full pt-1 pb-4 border-b border-document-guide align-top">
                  <FlexColumn className="justify-start items-start gap-3 w-full">
                    <FlexColumn className="pb-1 border-b border-document-heading justify-start items-start w-full">
                      <div className="justify-center text-document-heading text-xs font-bold font-mono uppercase leading-5 tracking-wide">
                        EXPERIENCE
                      </div>
                    </FlexColumn>
                    {experiences.map((exp, idx) => (
                      <FlexColumn
                        key={idx}
                        className="justify-start items-start mt-2 w-full"
                      >
                        <Flex className="justify-between items-baseline w-full">
                          <div className="text-document-heading text-sm font-bold font-sans leading-5">
                            {exp.companyName}
                          </div>
                          <div className="text-document-muted text-xs font-normal font-mono leading-5">
                            {exp.duration}
                          </div>
                        </Flex>
                        <div className="text-document-muted text-xs font-medium font-sans leading-5">
                          {exp.role}
                        </div>
                        <FlexColumn className="pl-4 pt-1.5 justify-start items-start gap-1 w-full">
                          {exp.description
                            .toString()
                            .split("- ")
                            .map(
                              (desc, dIdx) =>
                                desc && (
                                  <Flex
                                    key={dIdx}
                                    className="relative items-start w-full"
                                  >
                                    <span className="mr-2 text-document-foreground text-xs font-normal leading-4">
                                      •
                                    </span>
                                    <div className="text-left text-document-foreground text-xs font-normal font-sans leading-4">
                                      {desc}
                                    </div>
                                  </Flex>
                                ),
                            )}
                        </FlexColumn>
                      </FlexColumn>
                    ))}
                  </FlexColumn>
                </td>
              </tr>
            )}

            {/* Projects Section */}
            {projects.length > 0 && projects[0].name && (
              <tr className="w-full">
                <td className="w-full pt-1 pb-4 border-b border-document-guide align-top">
                  <FlexColumn className="justify-start items-start gap-3 w-full">
                    <FlexColumn className="pb-1 border-b border-document-heading justify-start items-start w-full">
                      <div className="justify-center text-document-heading text-xs font-bold font-mono uppercase leading-5 tracking-wide">
                        PROJECTS
                      </div>
                    </FlexColumn>
                    {projects.map((proj, idx) => (
                      <FlexColumn
                        key={idx}
                        className="justify-start items-start gap-0.5 mt-2 w-full"
                      >
                        <Flex className="justify-between items-baseline w-full">
                          <Flex className="items-center justify-between w-full">
                            <h3 className="text-document-heading text-sm font-bold font-sans leading-5">
                              {proj.name}
                            </h3>
                            <Flex className="gap-0.5 h-fit items-center">
                              {proj.link && (
                                <a
                                  href={proj.link}
                                  className="text-document-muted text-xs font-normal font-mono leading-5"
                                >
                                  <span className="underline">
                                    <Globe size={16} />
                                  </span>
                                </a>
                              )}
                              {proj.link && proj.repoLink && "·"}
                              {proj.repoLink && (
                                <a
                                  href={proj.repoLink}
                                  className="text-document-muted text-xs font-normal font-mono leading-5"
                                >
                                  <Code size={16} />
                                </a>
                              )}
                            </Flex>
                          </Flex>
                        </Flex>
                        <FlexColumn className="pl-4 pt-1 justify-start items-start gap-1 w-full">
                          {proj.description
                            .toString()
                            .split("- ")
                            .map(
                              (desc, dIdx) =>
                                desc && (
                                  <Flex key={dIdx} className="relative w-full">
                                    <span className="mr-2 text-document-foreground text-xs font-normal leading-4">
                                      •
                                    </span>
                                    <div className="text-document-foreground text-xs font-normal font-sans leading-4">
                                      {desc.trim()}
                                    </div>
                                  </Flex>
                                ),
                            )}
                        </FlexColumn>
                      </FlexColumn>
                    ))}
                  </FlexColumn>
                </td>
              </tr>
            )}

            {/* Skills Section */}
            {skills.length > 0 && (
              <tr className="w-full">
                <td className="w-full pt-1 pb-4 border-b border-document-guide align-top">
                  <FlexColumn className="justify-start items-start gap-2 w-full">
                    <FlexColumn className="pb-1 border-b border-document-heading justify-start items-start w-full">
                      <h2 className="text-document-heading text-xs font-bold font-mono uppercase leading-5 tracking-wide m-0">
                        SKILLS
                      </h2>
                    </FlexColumn>
                    <Flex className="flex-wrap gap-2">
                      {skills.map((skill, idx) => (
                        <Badge
                          key={idx}
                          className="bg-transparent text-document-foreground"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </Flex>
                  </FlexColumn>
                </td>
              </tr>
            )}

            {/* Education Section */}
            {educations.length > 0 && educations[0].institute && (
              <tr className="w-full">
                <td className="w-full pt-1 align-top">
                  <FlexColumn className="justify-start items-start gap-2 w-full">
                    <FlexColumn className="pb-1 border-b border-document-heading justify-start items-start w-full">
                      <h2 className="justify-center text-document-heading text-xs font-bold font-mono uppercase leading-5 tracking-wide m-0">
                        EDUCATION
                      </h2>
                    </FlexColumn>
                    {educations.map((edu, idx) => (
                      <Flex
                        key={idx}
                        className="justify-between items-start w-full mt-2"
                      >
                        <FlexColumn className="pb-px justify-start items-start">
                          <span className="text-document-heading text-sm font-bold font-sans leading-5">
                            {edu.course}{" "}
                            {edu.grade && <small>{`• ${edu.grade} GPA`}</small>}
                          </span>
                          <span className="text-document-muted text-xs font-normal font-sans leading-5">
                            {edu.institute}
                          </span>
                        </FlexColumn>
                        <div className="justify-center text-document-muted text-xs font-normal font-mono leading-5">
                          {edu.duration}
                        </div>
                      </Flex>
                    ))}
                  </FlexColumn>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </AspectRatio>
    </Flex>
  );
}

export default Preview;

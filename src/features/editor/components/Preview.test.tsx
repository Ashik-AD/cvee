import { describe, test, afterEach, expect } from 'vitest';
import { cleanup, render, within } from '@testing-library/react';
import type { Resume } from '@/lib/model/resume';
import Preview from './Preview';
import { splitDescription } from '@/components/templates/Shared';
import { useEditorStore } from '../store';
import { createResumeReponse } from '@/test/helpers';

afterEach(() => {
  cleanup();
  useEditorStore.setState(useEditorStore.getInitialState(), true);
});

describe('Resume preview', () => {
  const {
    aboutMe,
    personalInfo,
    experiences,
    projects,
    skills,
    educations,
  }: Resume = createResumeReponse({});

  test('Render resume correctly', () => {
    const { container } = render(
      <Preview
        personalInfo={personalInfo}
        aboutMe={aboutMe}
        experiences={experiences}
        projects={projects}
        skills={skills}
        educations={educations}
        template={'linear'}
      />,
    );

    const personalInfoEle =
      container.querySelector<HTMLElement>('#personal-info');
    const aboutMeEle = container.querySelector<HTMLElement>('#about-me');
    const experienceEle = container.querySelector<HTMLElement>('#experiences');
    const projectEle = container.querySelector<HTMLElement>('#projects');
    const skillEle = container.querySelector<HTMLElement>('#skills');
    const educationEle = container.querySelector<HTMLElement>('#educations');

    expect(personalInfoEle).not.toBeNull();
    expect(personalInfoEle).toBeInTheDocument();

    expect(aboutMeEle).not.toBeNull();
    expect(aboutMeEle).toBeInTheDocument();

    expect(experienceEle).not.toBeNull();
    expect(experienceEle).toBeInTheDocument();

    expect(projectEle).not.toBeNull();
    expect(projectEle).toBeInTheDocument();

    expect(skillEle).not.toBeNull();
    expect(skillEle).toBeInTheDocument();

    expect(educationEle).not.toBeNull();
    expect(educationEle).toBeInTheDocument();

    // Personal info
    expect(
      within(personalInfoEle!).getByText(personalInfo.name),
    ).toBeInTheDocument();
    expect(
      within(personalInfoEle!).getByText(personalInfo.role),
    ).toBeInTheDocument();
    expect(
      within(personalInfoEle!).getByText(personalInfo.email),
    ).toBeInTheDocument();
    expect(
      within(personalInfoEle!).getByText(personalInfo.contactNo),
    ).toBeInTheDocument();
    expect(
      within(personalInfoEle!).getByText(
        `linkedin.com/in/${personalInfo.linkedin}`,
      ),
    ).toBeInTheDocument();
    expect(
      within(personalInfoEle!).getByText(personalInfo.address),
    ).toBeInTheDocument();
    expect(
      within(personalInfoEle!).getByText(`github.com/${personalInfo.github}`),
    ).toBeInTheDocument();

    // about me
    expect(aboutMeEle).toHaveTextContent(aboutMe);

    // experience list
    const experienceList =
      experienceEle?.querySelectorAll<HTMLElement>('.experience-item') ?? [];
    expect(experienceList).toHaveLength(experiences.length);
    experiences.forEach((exp, idx) => {
      expect(experienceList[idx]).not.toBeNull();

      expect(
        within(experienceList[idx]).getByText(exp.companyName),
      ).toBeInTheDocument();
      expect(
        within(experienceList[idx]).getByText(exp.role),
      ).toBeInTheDocument();
      expect(
        within(experienceList[idx]).getByText(exp.duration),
      ).toBeInTheDocument();

      const descriptions = within(experienceList[idx]).getAllByRole('listitem');
      const normalizedDesc = splitDescription(exp.description.toString());
      expect(normalizedDesc).toHaveLength(descriptions.length);

      normalizedDesc.forEach((desc, idx) => {
        expect(descriptions[idx].textContent).toBe(desc);
      });
    });

    // project list
    const projectList =
      projectEle?.querySelectorAll<HTMLElement>('.project-item') ?? [];
    expect(projectList).toHaveLength(projects.length);

    projects.forEach((project, idx) => {
      expect(
        within(projectList[idx]).getByText(project.name),
      ).toBeInTheDocument();
      if (project.link?.trim()) {
        expect(
          within(projectList[idx]).getByRole('link', {
            name: project.link,
          }),
        ).toBeInTheDocument();
      }
      if (project.repoLink?.trim()) {
        expect(
          within(projectList[idx]).getByRole('link', {
            name: project.repoLink,
          }),
        ).toBeInTheDocument();
      }

      const descriptions = within(projectList[idx]).getAllByRole('listitem');
      const normalizedDesc = splitDescription(project.description.toString());
      expect(normalizedDesc).toHaveLength(descriptions.length);

      normalizedDesc.forEach((desc, idx) => {
        expect(descriptions[idx].textContent).toBe(desc);
      });
    });

    // education list
    const educationList =
      educationEle?.querySelectorAll<HTMLElement>('.education-item') ?? [];
    expect(educationList).toHaveLength(educations.length);

    educations.forEach((education, idx) => {
      expect(
        within(educationList[idx]).getByText(education.institute),
      ).toBeInTheDocument();

      expect(
        within(educationList[idx]).getByText(education.duration),
      ).toBeInTheDocument();

      expect(
        within(educationList[idx]).getByText(education.course),
      ).toBeInTheDocument();

      if (education.grade) {
        expect(
          within(educationList[idx]!).getByText(education.grade.toString()),
        ).toBeInTheDocument();
      } else {
        expect(
          within(educationList[idx]!).queryByText(/grade/i),
        ).not.toBeInTheDocument();
      }
    });

    // Skills
    skills.forEach((skill) => {
      expect(within(skillEle!).getByText(skill)).toBeInTheDocument();
    });
  });
});

import type { ResumePopulate } from '@/lib/model/resume';

export function createResumeReponse(details: Partial<ResumePopulate>) {
  const base: ResumePopulate = {
    id: 'test-resume-001',
    aboutMe:
      'Frontend developer focused on building accessible, maintainable, and performant web applications. Enjoys solving complex UI problems and creating thoughtful user experiences.',

    personalInfo: {
      name: 'Alex Morgan',
      email: 'alex.morgan@example.com',
      contactNo: '+1-202-555-0142',
      address: 'Portland, Oregon, USA',
      github: 'alexmorgan-dev',
      linkedin: 'alex-morgan-dev',
      role: 'Frontend Developer',
    },

    experiences: [
      {
        companyName: 'Northstar Technologies',
        role: 'Frontend Developer',
        duration: '2024 - Present',
        description:
          '- Developed reusable React and TypeScript components used across multiple product teams.\n- Built interactive dashboards and data tables for analyzing business metrics.\n- Improved application accessibility and loading performance.\n- Collaborated with designers and backend engineers to deliver new product features.',
      },
      {
        companyName: 'Pixel Foundry',
        role: 'Frontend Developer Intern',
        duration: '2023 - 2024',
        description:
          '- Implemented responsive interfaces using React and CSS.\n- Fixed UI bugs and improved form validation.\n- Participated in code reviews and learned team development workflows.',
      },
    ],

    projects: [
      {
        name: 'Analytics Dashboard',
        link: 'https://example.com/analytics',
        repoLink: 'https://github.com/example/analytics-dashboard',
        description:
          'A dashboard for visualizing business metrics with interactive charts, filtering, and responsive layouts.',
      },
      {
        name: 'Developer Toolkit',
        link: 'https://example.com/toolkit',
        repoLink: 'https://github.com/example/developer-toolkit',
        description:
          'A collection of browser-based developer utilities designed for quick, everyday workflows.',
      },
    ],

    educations: [
      {
        institute: 'Westbridge University',
        course: 'Bachelor of Science in Computer Science',
        duration: '2019 - 2023',
        grade: '3.8 GPA',
      },
      {
        institute: 'Westbridge University',
        course: 'Bachelor of Science in Computer Science',
        duration: '2019 - 2023',
        grade: '',
      },
    ],

    skills: [
      'TypeScript',
      'JavaScript',
      'React',
      'CSS',
      'HTML',
      'Node.js',
      'Go',
    ],

    addons: {},

    meta: {
      title: 'Alex Morgan - Frontend Developer',
      description:
        'A test resume for frontend rendering and editor integration.',
      template: 'linear',
    },
  };
  return Object.assign(base, details);
}

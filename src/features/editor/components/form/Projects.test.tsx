import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup, within } from '@testing-library/react';
import { useEditorStore } from '../../store';
import type { Project } from '@/lib/model/resume';
import Projects from './Projects';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
  useEditorStore.setState(useEditorStore.getInitialState(), true);
});

afterEach(() => {
  cleanup();
  useEditorStore.setState(useEditorStore.getInitialState(), true);
});

describe('Project fields', () => {
  const fieldData: Project[] = [
    {
      name: 'Resume Builder',
      link: 'https://my-project.com',
      repoLink: 'https://github.com/my-project',
      description: 'This project description',
    },
    {
      name: 'Code tinder',
      link: 'https://my-project.com',
      repoLink: 'https://github.com/my-project',
      description: 'This project description',
    },
  ];

  test('Fields values renders correctly', () => {
    useEditorStore.setState({
      projects: fieldData,
    });
    expect(useEditorStore.getState().projects).toHaveLength(fieldData.length);

    const { container } = render(<Projects />);

    const fields = container.querySelectorAll<HTMLElement>('.project-field');
    expect(fields).toHaveLength(fieldData.length);

    for (const [idx, field] of fields.entries()) {
      expect(within(field).getByLabelText(/project name/i)).toHaveValue(
        fieldData[idx].name,
      );
      expect(within(field).getByLabelText(/preview link/i)).toHaveValue(
        fieldData[idx].link,
      );
      expect(within(field).getByLabelText(/repo. link/i)).toHaveValue(
        fieldData[idx].repoLink,
      );
      expect(within(field).getByLabelText(/accomplishment/i)).toHaveValue(
        fieldData[idx].description,
      );
    }
  });

  test('typing fields updates the store for multiple projects', async () => {
    const { container } = render(<Projects />);

    const user = userEvent.setup();

    const addBtn = screen.getByRole('button', {
      name: /add project/i,
    });

    // add a second project
    await user.click(addBtn);

    const fields = container.querySelectorAll<HTMLElement>('.project-field');
    expect(fields).toHaveLength(fieldData.length);

    for (const [idx, field] of fields.entries()) {
      await user.type(
        within(field).getByLabelText(/project name/i),
        fieldData[idx].name,
      );
      await user.type(
        within(field).getByLabelText(/preview link/i),
        fieldData[idx].link,
      );
      await user.type(
        within(field).getByLabelText(/repo. link/i),
        fieldData[idx].repoLink,
      );
      await user.type(
        within(field).getByLabelText(/accomplishment/i),
        fieldData[idx].description.toString(),
      );
    }

    const projects = useEditorStore.getState().projects;
    expect(projects).toHaveLength(fields.length);

    fieldData.forEach((data, idx) => {
      expect(projects[idx]).toMatchObject(data);
    });
  });

  test('clicking single delete button remove a project', async () => {
    useEditorStore.setState({ projects: fieldData });

    const { container } = render(<Projects />);
    const user = userEvent.setup();

    const fields = container.querySelectorAll<HTMLElement>('.project-field');
    expect(fields).toHaveLength(fieldData.length);

    const btnDelete = within(fields[0]).getByRole('button', {
      name: /remove/i,
    });

    await user.click(btnDelete);

    expect(useEditorStore.getState().projects).toHaveLength(1);
    expect(container.querySelectorAll('.project-field')).toHaveLength(1);
  });

  test('delete all projects', async () => {
    useEditorStore.setState({ projects: fieldData });

    const { container } = render(<Projects />);
    const user = userEvent.setup();

    expect(
      container.querySelectorAll<HTMLElement>('.project-field'),
    ).toHaveLength(fieldData.length);
    expect(useEditorStore.getState().projects).toHaveLength(fieldData.length);

    while (container.querySelectorAll('.project-field').length > 0) {
      const fields = container.querySelectorAll<HTMLElement>('.project-field');
      const btnDelete = within(fields[0]).getByRole('button', {
        name: /remove/i,
      });
      await user.click(btnDelete);
    }

    expect(useEditorStore.getState().projects).toHaveLength(0);
    expect(container.querySelectorAll('.project-field')).toHaveLength(0);
  });
});

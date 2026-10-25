import { describe, test, expect, afterEach, beforeEach } from 'vitest';
import { render, cleanup, within, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useEditorStore } from '../../store';
import type { Experience } from '@/lib/model/resume';
import Experiences from './Experiences';

beforeEach(() => {
  // initialize full store
  useEditorStore.setState(useEditorStore.getInitialState(), true);
});

afterEach(() => {
  cleanup();
  useEditorStore.setState(useEditorStore.getInitialState(), true);
});

describe('Experiences', () => {
  const fieldData: Experience[] = [
    {
      companyName: 'Galactico',
      role: 'Frontend web developer',
      description: 'experience description',
      duration: '2024 - 2025',
    },
    {
      companyName: 'Luna',
      role: 'Future farmer',
      description: 'experience description',
      duration: '2030 - Present',
    },
  ];

  test('Values renders correctly', () => {
    useEditorStore.setState({
      experiences: fieldData,
    });

    const { container } = render(<Experiences />);

    const experiencesEles = container.querySelectorAll(
      '.experience-field',
    ) as NodeListOf<HTMLElement>;

    expect(experiencesEles).toHaveLength(fieldData.length);

    experiencesEles.forEach((field, idx) => {
      expect(within(field).getByLabelText(/company name/i)).toHaveValue(
        fieldData[idx].companyName,
      );
      expect(within(field).getByLabelText(/role/i)).toHaveValue(
        fieldData[idx].role,
      );
      expect(within(field).getByLabelText(/period/i)).toHaveValue(
        fieldData[idx].duration,
      );
      expect(within(field).getByLabelText(/accomplishment/i)).toHaveValue(
        fieldData[idx].description,
      );
    });
  });

  test('typing fields updates the store for multiple experiences', async () => {
    const { container } = render(<Experiences />);
    const user = userEvent.setup();

    const addBtn = screen.getByRole('button', {
      name: /add experience/i,
    });

    // Add a second experience
    await user.click(addBtn);

    const experienceElements =
      container.querySelectorAll<HTMLElement>('.experience-field');

    expect(experienceElements).toHaveLength(fieldData.length);

    for (const [index, element] of experienceElements.entries()) {
      const experience = within(element);
      const data = fieldData[index];

      await user.type(
        experience.getByLabelText(/company name/i),
        data.companyName,
      );

      await user.type(experience.getByLabelText(/^role$/i), data.role);

      await user.type(experience.getByLabelText(/period/i), data.duration);

      await user.type(
        experience.getByLabelText(/accomplishments/i),
        data.description.toString(),
      );
    }

    const experiences = useEditorStore.getState().experiences;

    expect(experiences).toHaveLength(fieldData.length);

    fieldData.forEach((data, idx) => {
      expect(experiences[idx]).toMatchObject(data);
    });
  });

  test('clicking single delete button remove a experience', async () => {
    useEditorStore.setState({
      experiences: fieldData,
    });

    const { container } = render(<Experiences />);
    const user = userEvent.setup();

    const fields = container.querySelectorAll<HTMLElement>('.experience-field');
    expect(fields).toHaveLength(fieldData.length);
    expect(useEditorStore.getState().experiences).toHaveLength(
      fieldData.length,
    );

    const btnDelete = within(fields[0]).getByRole('button', {
      name: /remove/i,
    });

    await user.click(btnDelete);

    expect(
      container.querySelectorAll<HTMLElement>('.experience-field'),
    ).toHaveLength(1);
    expect(useEditorStore.getState().experiences).toHaveLength(1);
  });

  test('delete all experiences', async () => {
    useEditorStore.setState({
      experiences: fieldData,
    });

    const { container } = render(<Experiences />);
    const user = userEvent.setup();

    const fields = container.querySelectorAll<HTMLElement>('.experience-field');
    expect(fields).toHaveLength(fieldData.length);
    expect(useEditorStore.getState().experiences).toHaveLength(
      fieldData.length,
    );

    while (
      container.querySelectorAll<HTMLElement>('.experience-field').length > 0
    ) {
      const fields =
        container.querySelectorAll<HTMLElement>('.experience-field');
      const btnDelete = within(fields[0]).getByRole('button', {
        name: /remove/i,
      });

      await user.click(btnDelete);
    }

    expect(
      container.querySelectorAll<HTMLElement>('.experience-field'),
    ).toHaveLength(0);
    expect(useEditorStore.getState().experiences).toHaveLength(0);
  });
});

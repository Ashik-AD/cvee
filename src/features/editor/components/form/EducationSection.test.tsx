import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { cleanup, render, screen, within } from '@testing-library/react';
import { useEditorStore } from '../../store';
import type { Education } from '@/lib/model/resume';
import EducationSection from './EducationSection';

beforeEach(() => {
  useEditorStore.setState(useEditorStore.getInitialState(), true);
});

afterEach(() => {
  cleanup();
  useEditorStore.setState(useEditorStore.getInitialState(), true);
});

describe('Education section', () => {
  const fieldData: Education[] = [
    {
      institute: 'xyz',
      duration: '2019 - 2024',
      course: 'MCS',
      grade: 2,
    },
    {
      institute: 'abc',
      duration: '2020 - 2026',
      course: 'BCA',
      grade: 1,
    },
  ];

  test('educations renders correctly', () => {
    useEditorStore.setState({
      educations: fieldData,
    });

    const { container } = render(<EducationSection />);
    expect(useEditorStore.getState().educations).toHaveLength(fieldData.length);

    const fields = container.querySelectorAll<HTMLElement>('.education-field');
    expect(fields).toHaveLength(fieldData.length);

    fields.forEach((field, idx) => {
      expect(within(field).getByLabelText(/^school/i)).toHaveValue(
        fieldData[idx].institute,
      );
      expect(within(field).getByLabelText(/degree/i)).toHaveValue(
        fieldData[idx].course,
      );
      expect(within(field).getByLabelText(/graduation period/i)).toHaveValue(
        fieldData[idx].duration,
      );
      expect(within(field).getByLabelText(/grade/i)).toHaveValue(
        fieldData[idx].grade,
      );
    });
  });

  test('typing fields correctly update the store', async () => {
    const { container } = render(<EducationSection />);
    const user = userEvent.setup();

    const btnAdd = screen.getByRole('button', {
      name: /add education/i,
    });

    await user.click(btnAdd);
    expect(useEditorStore.getState().educations).toHaveLength(2);

    const fields = container.querySelectorAll<HTMLElement>('.education-field');
    expect(fields).toHaveLength(2);

    for (const [idx, field] of fields.entries()) {
      await user.type(
        within(field).getByLabelText(/^school/i),
        fieldData[idx].institute,
      );
      await user.type(
        within(field).getByLabelText(/degree/i),
        fieldData[idx].course,
      );
      await user.type(
        within(field).getByLabelText(/graduation period/i),
        fieldData[idx].duration,
      );
      await user.type(
        within(field).getByLabelText(/grade/i),
        fieldData[idx].grade.toString(),
      );
    }

    const educations = useEditorStore.getState().educations;
    expect(educations).toHaveLength(fieldData.length);

    fieldData.forEach((data, idx) => {
      expect({
        ...educations[idx],
        grade: Number(educations[idx].grade),
      }).toMatchObject(data);
    });
  });

  test('clicking single delete button remove a education', async () => {
    useEditorStore.setState({
      educations: fieldData,
    });

    const { container } = render(<EducationSection />);
    const user = userEvent.setup();
    const fields = container.querySelectorAll<HTMLElement>('.education-field');
    const removedFieldData = fieldData[0];
    const deleteBtn = within(fields[0]).getByRole('button', {
      name: /remove/i,
    });

    expect(useEditorStore.getState().educations).toHaveLength(fieldData.length);
    expect(container.querySelectorAll('.education-field')).toHaveLength(
      fieldData.length,
    );

    await user.click(deleteBtn);

    const educations = useEditorStore.getState().educations;
    expect(educations).toHaveLength(1);
    expect(container.querySelectorAll('.education-field')).toHaveLength(1);
    expect(educations).not.toContainEqual(removedFieldData);
  });

  test('delete all educations', async () => {
    useEditorStore.setState({
      educations: fieldData,
    });

    const { container } = render(<EducationSection />);
    const user = userEvent.setup();

    expect(useEditorStore.getState().educations).toHaveLength(fieldData.length);
    expect(container.querySelectorAll('.education-field')).toHaveLength(
      fieldData.length,
    );

    while (container.querySelectorAll('.education-field').length > 0) {
      const fields =
        container.querySelectorAll<HTMLElement>('.education-field');
      await user.click(
        within(fields[0]).getByRole('button', {
          name: /remove/i,
        }),
      );
    }

    expect(useEditorStore.getState().educations).toHaveLength(0);
    expect(container.querySelectorAll('.education-field')).toHaveLength(0);
  });
});

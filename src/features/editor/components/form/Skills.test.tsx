import { beforeEach, afterEach, test, describe, expect } from 'vitest';
import { render, cleanup, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useEditorStore } from '../../store';
import Skills from './Skills';

beforeEach(() => {
  useEditorStore.setState(useEditorStore.getInitialState(), true);
});

afterEach(() => {
  cleanup();
  useEditorStore.setState(useEditorStore.getInitialState(), true);
});

describe('Skills', () => {
  const fieldData = ['html', 'css', 'typescript', 'vitest'];

  test('renders correctly', () => {
    useEditorStore.setState({
      skills: fieldData,
    });
    render(<Skills />);

    const skills = useEditorStore.getState().skills;
    expect(skills).toHaveLength(fieldData.length);
    expect(skills).toEqual(fieldData);

    fieldData.forEach((data) => {
      expect(screen.getByText(data)).toBeTruthy();
    });
  });

  test('add new skill', async () => {
    render(<Skills />);
    const user = userEvent.setup();

    const btnAddSkill = screen.getByRole('button', {
      name: /add skill/i,
    });

    const inputBox = screen.getByRole('textbox');
    const newSkill = 'ReactJs';

    await user.type(inputBox, newSkill);
    await user.click(btnAddSkill);
    await user.clear(inputBox);

    const skills = useEditorStore.getState().skills;
    expect(skills).toHaveLength(1);
    expect(skills).toContain(newSkill);
  });

  test('delete single skill', async () => {
    useEditorStore.setState({
      skills: fieldData,
    });

    render(<Skills />);
    const user = userEvent.setup();

    const skillToDelete = fieldData[0];
    const skillEle = screen.getByText(skillToDelete);
    const deleteBtn = within(skillEle).getByRole('button', { name: /remove/i });

    await user.click(deleteBtn);
    expect(useEditorStore.getState().skills).not.toContain(skillToDelete);
    expect(screen.queryByText(skillToDelete)).not.toBeInTheDocument();
  });

  test('delete all skills', async () => {
    useEditorStore.setState({
      skills: fieldData,
    });

    render(<Skills />);
    const user = userEvent.setup();

    const deleteBtns = screen.getAllByRole('button', {
      name: /remove/i,
    });
    expect(deleteBtns).toHaveLength(useEditorStore.getState().skills.length);

    while (screen.queryAllByRole('button', { name: /remove/i }).length > 0) {
      const deleteBtn = screen.getAllByRole('button', {
        name: /remove/i,
      })[0];

      await user.click(deleteBtn);
    }

    expect(useEditorStore.getState().skills).toHaveLength(0);
    fieldData.forEach((data) =>
      expect(screen.queryByText(data)).not.toBeInTheDocument(),
    );
  });
});

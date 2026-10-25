import { describe, test, beforeEach, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { useEditorStore } from '../../store';
import userEvent from '@testing-library/user-event';
import Summary from './Summary';

beforeEach(() => {
  // initialize full store
  useEditorStore.setState(useEditorStore.getInitialState(), true);
});

afterEach(() => {
  cleanup();
  useEditorStore.setState(useEditorStore.getInitialState(), true);
});

describe('Summary', () => {
  const fieldData = 'test summary';

  test('Values renders correctly', () => {
    useEditorStore.setState({
      aboutMe: fieldData,
    });

    render(<Summary />);

    expect(screen.getByLabelText(/professional bio/i)).toHaveValue(fieldData);
  });

  test('changing field correctly update store', async () => {
    render(<Summary />);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/professional bio/i), fieldData);
    const bio = useEditorStore.getState().aboutMe;
    expect(bio).not.toBeNull();
    expect(bio).toBe(fieldData);
  });
});

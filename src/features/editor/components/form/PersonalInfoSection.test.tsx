import { describe, test, beforeEach, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { useEditorStore } from '../../store';
import type { PersonalInfo } from '@/lib/model/resume';
import PersonalInfoSection from './PersonalInfoSection';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
  // initialize full store
  useEditorStore.setState(useEditorStore.getInitialState(), true);
});

afterEach(() => {
  cleanup();
  useEditorStore.setState(useEditorStore.getInitialState(), true);
});

describe('PersonalInfoSection', () => {
  const fieldData: PersonalInfo = {
    name: 'Ashik Dhimal',
    address: 'KTM, Nepal',
    contactNo: '111',
    email: 'example.com',
    github: 'lazyduck',
    linkedin: 'lazyduck',
    role: 'Frontend web developer',
  };

  test('Values renders correctly', () => {
    useEditorStore.setState({
      personalInfo: fieldData,
    });

    render(<PersonalInfoSection />);

    expect(screen.getByLabelText(/name/i)).toHaveValue(fieldData.name);
    expect(screen.getByLabelText(/email/i)).toHaveValue(fieldData.email);
    expect(screen.getByLabelText(/location/i)).toHaveValue(fieldData.address);
    expect(screen.getByLabelText(/role/i)).toHaveValue(fieldData.role);
    expect(screen.getByLabelText(/phone/i)).toHaveValue(fieldData.contactNo);
    expect(screen.getByLabelText(/linkedin/i)).toHaveValue(fieldData.linkedin);
    expect(screen.getByLabelText(/github/i)).toHaveValue(fieldData.github);
  });

  test('updating field correctly update store', async () => {
    render(<PersonalInfoSection />);
    const user = userEvent.setup();
    const updatedData = {
      name: 'Asik Dhimal',
      address: 'Damak, Nepal',
      contactNo: '98765432',
      email: 'dev.ashikdhimal@gmail.com',
      github: 'ashik-ad',
      linkedin: 'ashikdhimal',
      role: 'Future farmer',
    };

    await user.type(screen.getByLabelText(/name/i), updatedData.name);
    await user.type(screen.getByLabelText(/email/i), updatedData.email);
    await user.type(screen.getByLabelText(/location/i), updatedData.address);
    await user.type(screen.getByLabelText(/role/i), updatedData.role);
    await user.type(screen.getByLabelText(/phone/i), updatedData.contactNo);
    await user.type(screen.getByLabelText(/linkedin/i), updatedData.linkedin);
    await user.type(screen.getByLabelText(/github/i), updatedData.github);

    expect(useEditorStore.getState().personalInfo).toEqual(updatedData);
  });
});

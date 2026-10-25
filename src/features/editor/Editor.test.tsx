import {
  describe,
  test,
  beforeEach,
  beforeAll,
  vi,
  expect,
  afterEach,
} from 'vitest';
import {
  render,
  cleanup,
  screen,
  within,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ResumePopulate } from '@/lib/model/resume';
import Editor from '.';
import { useEditorStore } from './store';
import { Router } from 'wouter';
import { memoryLocation } from 'wouter/memory-location';
import { initDB } from '@/test/setup';
import { Services } from '@/lib/service/services';
import { Repositories } from '@/lib/repository/repositories';
import { ServicesContext } from '@/context/Services';
import { createResumeReponse } from '@/test/helpers';

const resume: ResumePopulate = createResumeReponse({});

const mockedServices: Partial<Services> = {
  //@ts-ignore-next-line no need to mock every method
  resumeSrv: {
    getResumeById: vi.fn().mockResolvedValue(resume),
  },
};

// vi.mock('@/lib/service/resume', () => {
//   const ResumeService = vi.fn(
//     class {
//       getResumeById = vi.fn(() => new Promise((res) => res(resume)));
//     },
//   );
//
//   return { ResumeService };
// });
//
let services: Services;

beforeAll(async () => {
  const db = await initDB();
  const repos = new Repositories(db);
  services = new Services(repos);
});

beforeEach(() => {
  useEditorStore.setState(useEditorStore.getInitialState(), true);
});

afterEach(() => {
  cleanup();
  useEditorStore.setState(useEditorStore.getInitialState(), true);
});

describe('Editor', () => {
  test('initialize correctly', async () => {
    const { hook, searchHook } = memoryLocation({
      path: '/editor',
      searchPath: 'id=123',
      static: true,
    });
    const { container } = render(
      <ServicesContext.Provider
        value={{ services: mockedServices as Services }}
      >
        <Router hook={hook} searchHook={searchHook}>
          <Editor />
        </Router>
      </ServicesContext.Provider>,
    );

    await waitFor(() => {
      expect(useEditorStore.getState()).toMatchObject(resume);
    });

    expect(mockedServices.resumeSrv?.getResumeById).toHaveBeenCalledWith('123');

    const state = useEditorStore.getState();
    expect(
      screen.getByRole('textbox', {
        name: /full name/i,
      }),
    ).toHaveValue(state.personalInfo.name);

    expect(
      within(container.querySelector<HTMLElement>('#personal-info')!).getByText(
        state.personalInfo.name,
      ),
    ).toBeInTheDocument();
  });

  test('updating form updates store & database', async () => {
    const dbResume = await services.resumeSrv.createNewResume(resume);
    expect(dbResume).not.toBeNull();

    const { hook, searchHook } = memoryLocation({
      path: '/editor',
      searchPath: `id=${dbResume.id}`,
      static: true,
    });

    render(
      <ServicesContext.Provider value={{ services }}>
        <Router hook={hook} searchHook={searchHook}>
          <Editor />
        </Router>
      </ServicesContext.Provider>,
    );

    await waitFor(() => {
      expect(useEditorStore.getState()).toMatchObject(dbResume);
    });

    const user = userEvent.setup();
    const fullName = 'Lazyduck';

    await user.clear(
      screen.getByRole('textbox', {
        name: /full name/i,
      }),
    );

    await user.type(
      screen.getByRole('textbox', {
        name: /full name/i,
      }),
      fullName,
    );
    expect(useEditorStore.getState().personalInfo.name).toBe(fullName);

    await waitFor(async () => {
      const updatedDbResume = await services.resumeSrv.getResumeById(
        dbResume.id,
      );
      expect(useEditorStore.getState().personalInfo).toMatchObject(
        updatedDbResume.personalInfo,
      );
    });
  });
});

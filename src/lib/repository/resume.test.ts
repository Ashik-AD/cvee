import { initDB } from '@/test/setup';
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  test,
  vi,
} from 'vitest';
import type { Resume, ResumePopulate } from '../model/resume';
import { ResumeRepository } from './resume';

let db: IDBDatabase;
let resumeRepo: ResumeRepository;

beforeAll(async () => {
  db = await initDB();
  resumeRepo = new ResumeRepository(db);
});

afterEach(() => {
  vi.useRealTimers();
});

afterAll(async () => {
  db.close();
});

describe('resume repository', () => {
  const resume: Resume = {
    personalInfo: {
      name: 'John Doe',
      role: 'Web developer',
      contactNo: '123',
      address: '69 street',
      email: 'johndoe.com',
      github: 'https://github.com/joedoe',
      linkedin: 'https://linkedin.com/joedoe',
    },
    aboutMe: 'test aboutme',
    experiences: [
      {
        companyName: 'Galactico',
        role: 'Web developer',
        duration: '2024 - 2025',
        description: 'test description',
      },
    ],
    projects: [
      {
        name: 'Resume builder',
        description: 'awesome resume builder',
        link: 'https://cevie.app',
        repoLink: 'https://github.com',
      },
    ],
    skills: ['html', 'typescript'],
    educations: [],
    addons: {},
  };

  const resumeMeta: Partial<ResumePopulate['meta']> = {
    title: 'test resume',
    template: 'obsidian',
    description: 'awesome resume builder i&apos;ve ever seen',
  };

  test('create new resume', async () => {
    const res = await resumeRepo.createNewResume(resume, resumeMeta);

    const { title, description, template, createdAt, updatedAt } = res.meta;

    expect(res.personalInfo).toStrictEqual(resume.personalInfo);
    expect(res.aboutMe).toBe(resume.aboutMe);
    expect({ title, description, template }).toEqual(resumeMeta);
    expect(new Date(createdAt!).toISOString()).toBe(createdAt);
    expect(new Date(updatedAt!).toISOString()).toBe(updatedAt);
    expect(createdAt).toBe(updatedAt);

    expect(res.experiences).toMatchObject(resume.experiences);
    expect(res.projects).toMatchObject(resume.projects);
    expect(res.skills).toEqual(resume.skills);
  });

  // No need to update each fields, just really essentials (not all)
  test('update resume details', async () => {

    const newResume = await resumeRepo.createNewResume(resume, resumeMeta);

    const data: Partial<ResumePopulate> = {
      ...newResume,
      aboutMe: 'about me is updated',
      meta: {
        ...newResume.meta,
        title: 'updated title',
        description: 'updated description',
      },
    };

    // fake the updatedAt date
    const date = new Date('2026-10-20T09:07:11.619Z');
    vi.setSystemTime(date);

    const updatedResume = await resumeRepo.updateResume(newResume.id, data);

    expect(updatedResume.id).toBe(newResume.id);
    expect(updatedResume.aboutMe).toBe(data.aboutMe);
    expect({
      title: updatedResume.meta?.title,
      description: updatedResume.meta?.description,
      template: updatedResume.meta?.template,
      createdAt: updatedResume.meta.createdAt,
    }).toEqual({
      title: data.meta?.title,
      description: data.meta?.description,
      template: data.meta?.template,
      createdAt: data.meta?.createdAt,
    });
    expect(updatedResume.meta?.updatedAt).toBe(date.toISOString());
  });

  test('return collection', async () => {
    const firstresume = await resumeRepo.createNewResume(resume, resumeMeta);
    const secondResume = await resumeRepo.createNewResume(resume, resumeMeta);

    const resumes = await resumeRepo.getResumes();

    expect(resumes.map((resume) => resume.id)).toEqual(
      expect.arrayContaining([firstresume.id, secondResume.id]),
    );
  });

  test('get resume detail by ID', async () => {
    const resumes = await resumeRepo.getResumes();
    const firstResume = resumes[0];

    const resumeDetail = await resumeRepo.getResumeById(firstResume.id);
    expect(resumeDetail).toStrictEqual(firstResume);
  });

  test('get resume lookups [id, name] collection', async () => {
    const lookups = await resumeRepo.resumeLookup();

    expect(lookups).toBeDefined();

    lookups.forEach((resume) => {
      expect(resume).toBeDefined();
      expect(resume.id).toBeDefined();
      expect(resume.label).toBeDefined();
    });
  });

  test('delete resume', async () => {
    const resumes = await resumeRepo.getResumes();
    const resumeToDelete = resumes[0];

    const res = await resumeRepo.deleteResume(resumeToDelete.id);
    expect(res).toBeTruthy();

    const resumeDetail = await resumeRepo.getResumeById(resumeToDelete.id);
    expect(resumeDetail).toBeUndefined();
  });
});

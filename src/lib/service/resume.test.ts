import { beforeAll, afterAll, expect, describe, test } from 'vitest';
import { Repositories } from '../repository/repositories';
import type { Database } from '../database';
import { initDB } from '@/test/setup';
import type { Resume, ResumePopulate } from '../model/resume';
import { Services } from './services';

let db: Database['db'];
let service: Services;

beforeAll(async () => {
  db = await initDB();
  let repo = new Repositories(db);
  service = new Services(repo);
});

afterAll(() => {
  db?.close();
});

const data: Resume[] = [
  {
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
  },
];

const resumeMeta: Partial<ResumePopulate['meta']> = {
  title: 'test resume',
  template: 'obsidian',
  description: 'awesome resume builder i&apos;ve ever seen',
};

describe('createNewResume', () => {
  test('create new', async () => {
    const resume = await service.resumeSrv.createNewResume(data[0], resumeMeta);
    expect(resume).toBeDefined();
    expect(resume.id).toBeTruthy();
    expect(resume.personalInfo).toEqual(data[0].personalInfo);
    expect(resume.aboutMe).toBe(data[0].aboutMe);
    expect(resume.meta.title).toBe(resumeMeta.title);
    expect(resume.meta.createdAt).toBe(resume.meta.updatedAt);
  });

  test('missing payload, throw error', async () => {
    await expect(
      service.resumeSrv.createNewResume({} as Resume),
    ).rejects.toThrow('Resume data is missing');
  });
});

describe('getResumes', () => {
  test('get resume list', async () => {
    const firstResume = await service.resumeSrv.createNewResume(
      data[0],
      resumeMeta,
    );
    const secondResume = await service.resumeSrv.createNewResume(
      data[0],
      resumeMeta,
    );

    const resumes = await service.resumeSrv.getResumes();
    expect(resumes.map((resume) => resume.id)).toEqual(
      expect.arrayContaining([firstResume.id, secondResume.id]),
    );
  });
});

describe('getResumeById', () => {
  test('get resume detail', async () => {
    const newResume = await service.resumeSrv.createNewResume(
      data[0],
      resumeMeta,
    );
    const resume = await service.resumeSrv.getResumeById(newResume.id);
    expect(resume.id).toBe(newResume.id);
    expect(resume.meta.title).toBe(newResume.meta.title);
  });

  test('resume detail not found', async () => {
    await expect(service.resumeSrv.getResumeById('2323')).rejects.toThrow(
      'Resume not found',
    );
  });

  test('resume id not provided', async () => {
    await expect(service.resumeSrv.getResumeById('')).rejects.toThrow(
      'Resume id is not provided',
    );
  });
});

describe('updateResume', () => {
  test('update resume role', async () => {
    const newResume = await service.resumeSrv.createNewResume(
      data[0],
      resumeMeta,
    );
    const payload = {
      ...newResume,
      personalInfo: { ...newResume.personalInfo, role: 'updated role' },
    };
    const updatedResume = await service.resumeSrv.updateResume(
      newResume.id,
      payload,
    );
    expect(updatedResume?.personalInfo.role).toBe(payload.personalInfo.role);
  });

  test('resume not found', async () => {
    await expect(
      service.resumeSrv.updateResume('111', data[0]),
    ).rejects.toThrow('Resume not found');
  });

  test('empty resume', async () => {
    await expect(service.resumeSrv.updateResume('111', {})).rejects.toThrow(
      'Resume details is required',
    );
  });
});

describe('delete', () => {
  test('delete resume', async () => {
    const newResume = await service.resumeSrv.createNewResume(
      data[0],
      resumeMeta,
    );
    let resumes = await service.resumeSrv.getResumes();
    expect(resumes.map((resume) => resume.id)).toContain(newResume.id);
    await service.resumeSrv.deleteResume(newResume.id);
    resumes = await service.resumeSrv.getResumes();
    expect(resumes.map((resume) => resume.id)).not.toContain(newResume.id);
  });

  test('resume not found', async () => {
    await expect(service.resumeSrv.deleteResume('111')).rejects.toThrow(
      'Resume not found',
    );
  });
});

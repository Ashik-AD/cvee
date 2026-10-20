import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import type { Database } from '../database';
import { initDB } from '@/test/setup';
import { Repositories } from './repositories';
import { ResumeRepository } from './resume';

let db: Database['db'];

beforeAll(async () => {
  db = await initDB();
});

afterAll(() => {
  db?.close();
});

describe('Repositories', () => {
  test('repositories initialize correctly', () => {
    const repo = new Repositories(db);
    expect(repo.resume).toBeInstanceOf(ResumeRepository);
  });

  test('throw error on database is missing', () => {
    expect(() => new Repositories(null)).toThrow();
  });
});

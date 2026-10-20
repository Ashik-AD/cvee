import { describe, test, expect, beforeAll, afterAll } from 'vitest';
import type { Database } from '../database';
import { Repositories } from '../repository/repositories';
import { initDB } from '@/test/setup';
import { Services } from './services';
import { ResumeService } from './resume';

let db: Database['db'];
let repos: Repositories;

beforeAll(async () => {
  db = await initDB();
  repos = new Repositories(db);
});

afterAll(() => {
  db?.close();
});

describe('Services', () => {
  test('services initialize correctly', () => {
    const services = new Services(repos);
    expect(services.resumeSrv).toBeInstanceOf(ResumeService);
  });

  test('service failed to initialize due to missing repositories', () => {
    expect(() => new Services(undefined)).toThrow();
  });
});

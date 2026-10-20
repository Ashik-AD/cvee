import { AppError } from '@/utils/error';
import { ResumeRepository } from './resume';
import type { Database } from '../database';

interface Repos {
  readonly resume: ResumeRepository;
}

export class Repositories implements Repos {
  resume: ResumeRepository;

  // Initialize repositories
  constructor(db: Database['db']) {
    if (!db) throw new AppError('database is required', 'UNKNOWN_ERROR');
    this.resume = new ResumeRepository(db);
  }
}

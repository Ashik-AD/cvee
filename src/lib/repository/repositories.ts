import { ResumeRepository } from "./resume";

interface Repos {
  readonly resume: ResumeRepository;
}

export class Repositories implements Repos {
  resume: ResumeRepository;

  // Initialize repositories
  constructor(db: IDBDatabase) {
    this.resume = new ResumeRepository(db);
  }
}

import { ResumeRepository } from './repository/resume';

export class Database {
  private name: string;
  private version: number;
  private db: IDBDatabase | null = null;

  constructor(name: string, version?: number) {
    this.name = name;
    this.version = version ?? 1;
  }

  async connect() {
    if (this.db) return Promise.resolve(this.db);

    return new Promise<IDBDatabase>((resolve, reject) => {
      const dbReq = window.indexedDB.open(this.name, this.version);

      dbReq.onupgradeneeded = (event) => {
        const db = dbReq.result;

        const oldVersion = event.oldVersion;
        const newVersion = event.newVersion;

        // Initialize all repository schema
        if (oldVersion < 1) {
          ResumeRepository.createSchemaV1(db);
        }

        // Migrate other version
        if (newVersion && oldVersion < newVersion) {
        }
      };

      dbReq.onerror = () => {
        reject(dbReq.error);
      };

      dbReq.onsuccess = () => {
        this.db = dbReq.result;
        resolve(this.db);
      };
    });
  }
}

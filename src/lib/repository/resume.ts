import type { Resume, ResumePopulate } from '@/lib/model/resume';
import { DatabaseError } from '@/utils/error';

const STORE_NAME = 'resumes';

export class ResumeRepository {
  private db: IDBDatabase;

  static createSchemaV1(db: IDBDatabase) {
    // Initialize object store
    const objectStore = db.createObjectStore(STORE_NAME, {
      keyPath: 'id',
    });

    // Create an index to search by name
    objectStore.createIndex('name', 'personalInfo.name', {
      unique: false,
    });

    // Create an index to search by email
    objectStore.createIndex('email', 'personalInfo.email', {
      unique: false,
    });
    // Create an index to search by role
    objectStore.createIndex('role', 'personalInfo.role', {
      unique: false,
    });

    // Create an index to search by skills
    objectStore.createIndex('skills', 'skills', {
      unique: false,
    });
  }

  constructor(db: IDBDatabase) {
    this.db = db;
  }

  async createNewResume(
    resume: Resume,
    metaDetail?: Partial<ResumePopulate['meta'] & { id: string }>,
  ) {
    return new Promise<ResumePopulate>((resolve, reject) => {
      const trn = this.db.transaction([STORE_NAME], 'readwrite');

      // Generate id for resume
      const id = crypto.randomUUID();
      const now = new Date().toISOString();

      let resumeName =
        metaDetail?.title ?? `Untitled - ${new Date().toLocaleString()}`;
      // Set default meta data
      const meta = {
        createdAt: now,
        updatedAt: now,
        title: resumeName,
        description: metaDetail?.description || '',
        template: metaDetail?.template || undefined,
      } satisfies ResumePopulate['meta'];

      const payload = {
        ...resume,
        id,
        meta,
      };

      trn.objectStore(STORE_NAME).add(payload);

      trn.onerror = () => {
        reject(
          new DatabaseError(
            trn.error?.message || 'Failed to create resume',
            undefined,
            { cause: trn.error },
            { ...payload, id: metaDetail?.id ?? payload.id },
          ),
        );
      };

      trn.oncomplete = () => {
        resolve(payload);
      };

      trn.onabort = () => {
        // check quota exceed error
        if (trn.error?.QUOTA_EXCEEDED_ERR) {
          reject(
            new DatabaseError(
              'Browser storage is full. Free up space and try again.',
              'STORAGE_FULL',
              { cause: trn.error },
              { ...payload, id: metaDetail?.id ?? payload.id },
            ),
          );
          return;
        }

        reject(
          new DatabaseError(
            trn.error?.message || 'Resume creation was aborted',
            undefined,
            { cause: trn.error },
            { ...payload, id: metaDetail?.id ?? payload.id },
          ),
        );
      };
    });
  }

  async getResumes() {
    return new Promise<ResumePopulate[]>((resolve, reject) => {
      const trn = this.db.transaction([STORE_NAME]);
      const request = trn.objectStore(STORE_NAME).getAll();

      request.onerror = () => {
        reject(
          new DatabaseError(trn.error?.message || 'Failed to get resumes'),
        );
      };

      trn.oncomplete = () => {
        const result = request.result;
        resolve(result);
      };

      trn.onabort = () => {
        reject(
          new DatabaseError(
            trn.error?.message || 'Resumes retrieve was aborted',
            undefined,
            { cause: trn.error },
          ),
        );
      };
    });
  }

  async getResumeById(id: string): Promise<ResumePopulate> {
    return new Promise((resolve, reject) => {
      const trn = this.db.transaction([STORE_NAME], 'readonly');
      const request = trn.objectStore(STORE_NAME).get(id);

      trn.onerror = () => {
        reject(
          new DatabaseError(
            trn.error?.message || 'Failed to retrieve resume',
            undefined,
            { cause: trn.error },
            id,
          ),
        );
      };

      trn.oncomplete = () => {
        const result = request.result;
        resolve(result);
      };

      trn.onabort = () => {
        reject(
          new DatabaseError(
            trn.error?.message || 'Resume retrieve was aborted',
            undefined,
            { cause: trn.error },
            id,
          ),
        );
      };
    });
  }

  async updateResume(id: string, resume: Partial<ResumePopulate>) {
    return new Promise<ResumePopulate>((resolve, reject) => {
      const trn = this.db.transaction([STORE_NAME], 'readwrite');

      const payload: Partial<ResumePopulate> = {
        ...resume,
        id,
        meta: {
          title: resume.meta?.title || '',
          createdAt: resume.meta?.createdAt || null,
          description: resume?.meta?.description || '',
          updatedAt: new Date().toISOString(),
          template: resume?.meta?.template,
        },
      };

      trn.objectStore(STORE_NAME).put(payload);

      trn.onerror = () => {
        reject(
          new DatabaseError(
            trn.error?.message || 'Failed to update resume',
            undefined,
            { cause: trn.error },
            payload,
          ),
        );
      };

      trn.oncomplete = () => {
        resolve(payload as ResumePopulate);
      };

      trn.onabort = () => {
        if (trn.error?.QUOTA_EXCEEDED_ERR) {
          reject(
            new DatabaseError(
              'Browser storage is full. Free up space and try again.',
              'STORAGE_FULL',
              { cause: trn.error },
              { ...payload, id: resume?.id ?? payload.id },
            ),
          );
          return;
        }

        reject(
          new DatabaseError(
            trn.error?.message || 'Resume update was aborted',
            undefined,
            { cause: trn.error },
            payload,
          ),
        );
      };
    });
  }

  async resumeLookup() {
    return new Promise<Array<{ label: string; id: string }>>(
      (resolve, reject) => {
        const trn = this.db.transaction([STORE_NAME], 'readonly');
        const request = trn.objectStore(STORE_NAME).getAll();

        trn.onerror = () => {
          reject(
            new DatabaseError(trn.error?.message || 'Resumes lookup failed'),
          );
        };

        trn.oncomplete = () => {
          const result = request.result;
          const resumes = result?.map((resume: ResumePopulate) => ({
            label: resume?.meta?.title ?? '',
            id: resume.id,
          }));
          resolve(resumes);
        };

        trn.onabort = () => {
          reject(
            new DatabaseError(
              trn.error?.message || 'Resume lookup was aborted',
            ),
          );
        };
      },
    );
  }

  async deleteResume(id: string) {
    return new Promise<void>((resolve, reject) => {
      const trn = this.db.transaction([STORE_NAME], 'readwrite');
      trn.objectStore(STORE_NAME).delete(id);

      trn.onerror = () => {
        reject(
          new DatabaseError(trn.error?.message || 'Failed to delete resume'),
        );
      };

      trn.oncomplete = () => {
        resolve();
      };

      trn.onabort = () => {
        reject(
          new DatabaseError(
            trn.error?.message || 'Resume deletion was aborted',
          ),
        );
      };
    });
  }

  async getResumesName(): Promise<
    Array<{ name: string | null; id: string } | null>
  > {
    const resumes = await this.getResumes();
    if (!resumes?.length) return [];
    return resumes.map((resume) => ({
      name: resume.meta?.title,
      id: resume.id,
    }));
  }
}

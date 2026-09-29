import type { CVTemplates } from "@/components/templates";
import type { Resume } from "@/features/editor/types";
const STORE_NAME = "resumes";

export interface ResumePopulate extends Resume {
  id: string;
  meta: {
    title: string | null;
    description: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    template?: CVTemplates | null;
  };
}

export class EditorService {
  private db: IDBDatabase;
  static createSchemaV1(db: IDBDatabase) {
    // Initialize object store
    const objectStore = db.createObjectStore(STORE_NAME, {
      keyPath: "id",
    });

    // Create an index to search by name
    objectStore.createIndex("name", "personalInfo.name", {
      unique: false,
    });

    // Create an index to search by email
    objectStore.createIndex("email", "personalInfo.email", {
      unique: false,
    });
    // Create an index to search by role
    objectStore.createIndex("role", "personalInfo.role", {
      unique: false,
    });

    // Create an index to search by skills
    objectStore.createIndex("skills", "skills", {
      unique: false,
    });
  }

  constructor(db: IDBDatabase) {
    this.db = db;
  }

  async createNewResume(resume: Resume, title?: string) {
    return new Promise<ResumePopulate>((resolve, reject) => {
      const trn = this.db.transaction([STORE_NAME], "readwrite");

      const id = crypto.randomUUID();
      const createdAt = new Date().toISOString();
      const updatedAt = new Date().toISOString();

      let resumeName = title ?? `Untitled - ${new Date().toLocaleString()}`;

      const meta = {
        createdAt,
        updatedAt,
        title: resumeName,
        description: "",
      } satisfies ResumePopulate["meta"];

      const payload = {
        ...resume,
        id,
        meta,
      };

      const request = trn.objectStore(STORE_NAME).add(payload);

      request.onerror = (error) => {
        reject(error);
      };

      request.onsuccess = () => {
        resolve(payload);
      };
    });
  }

  async getResumes() {
    return new Promise<ResumePopulate[]>((resolve, reject) => {
      const trn = this.db.transaction([STORE_NAME]);
      const request = trn.objectStore(STORE_NAME).getAll();

      request.onerror = (error) => {
        reject(error);
      };

      request.onsuccess = (event) => {
        const target = event.target as IDBRequest;
        resolve(target?.result);
      };
    });
  }

  async getResumeById(id: string): Promise<ResumePopulate> {
    return new Promise((resolve, reject) => {
      const trn = this.db.transaction([STORE_NAME], "readonly");
      const request = trn.objectStore(STORE_NAME).get(id);

      request.onerror = (error) => {
        reject(error);
      };

      request.onsuccess = (event) => {
        console.log("Found resume with ID: ", id);
        const target = event.target as IDBRequest;
        resolve(target?.result);
      };
    });
  }

  async update(id: string, resume: Partial<ResumePopulate>) {
    return new Promise<ResumePopulate>((resolve, reject) => {
      const trn = this.db.transaction([STORE_NAME], "readwrite");

      const payload: Partial<ResumePopulate> = {
        ...resume,
        id,
        meta: {
          title: resume.meta?.title ?? "",
          createdAt: resume.meta?.createdAt ?? null,
          description: resume.meta?.title ?? "",
          updatedAt: new Date().toISOString(),
          template: resume?.meta?.template,
        },
      };

      const request = trn.objectStore(STORE_NAME).put(payload);

      request.onerror = (error) => {
        reject(error);
      };

      request.onsuccess = () => {
        resolve(payload as ResumePopulate);
      };
    });
  }

  async resumeLookup() {
    return new Promise<Array<{ label: string; id: string }>>(
      (resolve, reject) => {
        const trn = this.db.transaction([STORE_NAME], "readonly");
        const request = trn.objectStore(STORE_NAME).getAll();

        request.onerror = (error) => {
          reject(error);
        };

        request.onsuccess = (event) => {
          const target = event.target as IDBRequest;
          const resumes = target.result?.map((resume: ResumePopulate) => ({
            label: resume?.meta?.title,
            id: resume.id,
          }));
          resolve(resumes);
        };
      },
    );
  }

  async deleteResume(id: string) {
    return new Promise<Array<{ label: string; id: string }>>(
      (resolve, reject) => {
        const trn = this.db.transaction([STORE_NAME], "readwrite");
        const request = trn.objectStore(STORE_NAME).delete(id);

        request.onerror = (error) => {
          reject(error);
        };

        request.onsuccess = (event) => {
          const target = event.target as IDBRequest;
          resolve(target.result);
        };
      },
    );
  }

  async getResumesName(): Promise<
    Array<{ name: string | null; id: string } | null>
  > {
    try {
      const resumes = await this.getResumes();
      if (!resumes?.length) return [];
      return resumes.map((resume) => ({
        name: resume.meta?.title,
        id: resume.id,
      }));
    } catch (error) {
      throw error as Error;
    }
  }
}

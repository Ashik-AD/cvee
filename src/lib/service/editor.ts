import type { Resume } from "@/features/editor/types";
import type { RegexRouteParams } from "wouter";
const STORE_NAME = "resumes";

export interface ResumePopulate extends Resume {
  id: string;
  meta: {
    title: string;
    description: string;
    createdAt: string | null;
    updatedAt: string | null;
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

  async createNewResume(resume: Resume) {
    return new Promise<ResumePopulate>((resolve, reject) => {
      const trn = this.db.transaction([STORE_NAME], "readwrite");

      const id = crypto.randomUUID();
      const createdAt = new Date().toISOString();
      const updatedAt = new Date().toISOString();
      const meta = {
        createdAt,
        updatedAt,
        title: `Untitled - ${new Date().toLocaleString()}`,
        description: "",
      };

      const request = trn.objectStore(STORE_NAME).add({ ...resume, id, meta });

      request.onerror = (error) => {
        reject(error);
      };

      request.onsuccess = (event) => {
        resolve(event.target?.result);
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
        resolve(event.target?.result);
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
        console.log("Resume: ", event.target.result);
        resolve(event.target?.result);
      };
    });
  }

  async update(id: string, resume: Partial<ResumePopulate>) {
    return new Promise<ResumePopulate>((resolve, reject) => {
      const trn = this.db.transaction([STORE_NAME], "readwrite");
      const meta: ResumePopulate["meta"] = {
        ...(resume.meta ?? {}),
        updatedAt: new Date().toISOString(),
      };

      const request = trn.objectStore(STORE_NAME).put({ ...resume, id, meta });

      request.onerror = (error) => {
        reject(error);
      };

      request.onsuccess = (event) => {
        resolve(event.target.value);
      };
    });
  }
}

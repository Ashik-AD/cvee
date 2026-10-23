import { ResumeRepository } from '@/lib/repository/resume';
import 'fake-indexeddb/auto';

export async function initDB() {
  const request = indexedDB.open('test', 1);

  return new Promise<IDBDatabase>((resolve, reject) => {
    request.onupgradeneeded = () => {
      ResumeRepository.createSchemaV1(request.result);
    };
    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

import { ResumeRepository } from '@/lib/repository/resume';
import 'fake-indexeddb/auto';

export async function initDB() {
  const request = indexedDB.open('test', 1);

  return new Promise<IDBDatabase>((resolve, reject) => {
    request.onupgradeneeded = () => {
      ResumeRepository.createSchemaV1(request.result);
      console.log('Schema setup successful');
    };
    request.onsuccess = () => {
      resolve(request.result);
      console.log('Database setup done');
    };

    request.onerror = () => {
      console.error(request.error?.message);
      reject(request.error);
    };
  });
}

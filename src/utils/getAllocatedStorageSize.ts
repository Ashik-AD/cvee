import { byteConversion } from "./byteConversion";

/**
 * Get allocated storage size of this domain
 * */
export async function getAllocatedStorageSize() {
  const storage = await navigator.storage.estimate();
  const quota = storage.quota ?? 0;
  const usage = storage.usage ?? 0;

  const formatedQuota = byteConversion(quota);
  const formatedTotalUsage = byteConversion(usage);

  return {
    quota: { detail: formatedQuota, size: quota },
    usage: { detail: formatedTotalUsage, size: usage },
  };
}

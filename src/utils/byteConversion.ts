/**
 * Convert Bytes into readable format.
 * @param bytes - number
 * @returns result { size: number, unit: string }
 *
 * @example
 * ``tsx
 * const result = byteConversion(1000)
 * result.size // 1
 * result.unit // KB
 * ``
 * */
export function byteConversion(bytes: number) {
  if (bytes <= 0 || isNaN(bytes))
    return {
      size: 0,
      unit: null,
    };

  const kB = bytes / 1000;
  const mB = kB / 1000;
  const gB = mB / 1000;

  if (gB >= 1) {
    return toFormat(gB, "GB");
  }
  if (mB >= 1) {
    return toFormat(mB, "MB");
  }

  if (kB > 0) {
    return toFormat(kB, "KB");
  }

  function toFormat(size: number, unit: string) {
    return {
      size: Number(Math.fround(size).toFixed(2)),
      unit,
    };
  }
}

export function objIsEmpty(obj: unknown) {
  if (!obj || obj === undefined || obj === null) return true;
  return Object.keys(obj ?? {})?.length === 0 ? true : false;
}

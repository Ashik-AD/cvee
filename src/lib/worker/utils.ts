export function toError(reason: unknown, code: string, desc: string) {
  const error = {
    error: code,
    description: desc,
    reason,
  };
  return JSON.stringify(error);
}

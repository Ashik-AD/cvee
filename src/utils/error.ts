export function getErrorMessage(error: unknown, fallbackMsg?: string) {
  if (error instanceof Error) {
    return error.message;
  }
  return fallbackMsg ?? "Unknown error. Please try again.";
}

export class AppError extends Error {
  public code: string | undefined;
  public status: number | undefined;
  public detail: string | undefined;

  constructor(
    message: string,
    code?: string,
    status?: number,
    detail?: string,
  ) {
    super(message);
    this.name = "AppError";

    this.code = code;
    this.status = status;
    this.detail = detail;
  }
}

export class DatabaseError extends Error {
  code: string | undefined;
  constructor(message: string, code?: string) {
    super(message);
    this.name = "DbError";

    this.code = code;
  }
}

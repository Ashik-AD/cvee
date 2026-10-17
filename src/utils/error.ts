type AppErrorCodes = "NOT_FOUND" | "UNKNOWN_ERROR";
type DatabaseErrorCode = "STORAGE_FULL";

export type ErrorCodes = AppErrorCodes | DatabaseErrorCode;

export class BaseError extends Error {
  code?: ErrorCodes;
  status?: number;
  attachment?: unknown;
  constructor(
    msg: string,
    code?: ErrorCodes,
    status?: number,
    options?: ErrorOptions,
    attachment?: unknown,
  ) {
    super(msg, options);
    this.code = code;
    this.status = status;
    this.attachment = attachment;
    this.name = "BaseError";
  }
}

export class AppError extends BaseError {
  constructor(
    message: string,
    code?: AppErrorCodes,
    status?: number,
    options?: ErrorOptions,
    attachment?: unknown,
  ) {
    super(message, code, status, options, attachment);
    this.name = "AppError";
  }
}

export class DatabaseError extends BaseError {
  constructor(
    message: string,
    code?: DatabaseErrorCode,
    options?: ErrorOptions,
    attachment?: unknown,
  ) {
    super(message, code, undefined, options, attachment);
    this.name = "DatabaseError";
  }
}

export function getErrorMessage(error: unknown, fallbackMsg?: string) {
  if (error instanceof Error) {
    return error.message;
  }
  return fallbackMsg ?? "Unknown error. Please try again.";
}

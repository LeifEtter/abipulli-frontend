import { ErrorInfo } from "abipulli-types";

/**
 * Interface representing internal error information for API errors.
 */
export interface InternalErrorInfo {
  code: number;
  msg: string;
}

/**
 * Custom error class for API errors.
 * Extends the native Error class and adds code, info, and resource properties.
 */
export class ApiError extends Error {
  public readonly code: number;
  public readonly info: string;
  public readonly resource?: string;

  /**
   * Constructs a new ApiError instance.
   * @param code - Error code (HTTP status or custom code)
   * @param info - Error message
   * @param resource - Optional resource related to the error
   */
  constructor({ code, info, resource }: ErrorInfo) {
    super(info);
    this.code = code;
    this.info = info;
    this.resource = resource;
  }

  /**
   * Creates an internal server error (500) ApiError instance.
   * @param errorInfo - Internal error information
   * @returns ApiError instance representing an internal error
   */
  static internal({
    errorInfo,
  }: {
    errorInfo: InternalErrorInfo | null;
  }): ApiError {
    return new ApiError({
      code: errorInfo?.code ?? 500,
      info: errorInfo?.msg ?? "Internal Server Error",
    });
  }

  /**
   * Creates a not found (404) ApiError instance for a specific resource.
   * @param resource - The resource that was not found
   * @returns ApiError instance representing a not found error
   */
  static notFound({ resource }: { resource: string }): ApiError {
    return new ApiError({
      code: 404,
      info: `Resource ${resource} not found`,
    });
  }
}

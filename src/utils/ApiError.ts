export class ApiError extends Error {
  public statusCode: number;
  public errors: string[];
  public success: boolean;

  constructor(
    statusCode: number,
    message: string = 'Something went wrong',
    errors: string[] = [],
    stack: string = ''
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.success = false;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = 'Resource not found', errors: string[] = [], stack: string = '') {
    super(404, message, errors, stack);
  }
}

export class InternalServerError extends ApiError {
  constructor(
    message: string = 'Internal Server Error',
    errors: string[] = [],
    stack: string = ''
  ) {
    super(500, message, errors, stack);
  }
}

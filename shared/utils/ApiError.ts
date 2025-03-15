abstract class CustomError extends Error {
    abstract statusCode: number;
    abstract serializeErrors(): ApiErrorList;

    constructor(message: string) {
        super(message);
    }
}

export class ApiError extends CustomError {
    statusCode: number;
    success: boolean;
    errors: ApiErrorList;
    constructor(
        statusCode: number, 
        message: string="Something went wrong.", 
        errors: ApiErrorList=[], 
        success: boolean = false,
        stack?: string
    ) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.success = success;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    serializeErrors(): ApiErrorList {
        return this.errors;
    }
}

export class NotFoundError extends CustomError {
    statusCode: number = 404;
    errors: ApiErrorList;
    success: boolean;

    constructor(
        message: string = "Not Found",
        errors: ApiErrorList = [{ message: "Not Found" }],
        success: boolean = false,
        stack?: string
    ) {
        super(message);
        this.success = success;
        
        this.errors = errors;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    serializeErrors(): ApiErrorList {
        return this.errors;
    }
}

export class ValidationError extends CustomError {
    statusCode: number = 422;
    errors: ApiErrorList;
    success: boolean;

    constructor(
        message: string = "Validation Error",
        errors: ApiErrorList = [{ message: "Invalid Data" }],
        success: boolean = false,
        stack?: string
    ) {
        super(message);
        this.success = success;

        this.errors = errors;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    serializeErrors(): ApiErrorList {
        return this.errors;
    }
}

export class BadRequestError extends CustomError {
  statusCode: number = 400;
  errors: ApiErrorList;
  success: boolean;

  constructor(
    message: string = "Bad Request",
    errors: ApiErrorList = [{ message: "Bad Request" }],
    success: boolean = false,
    stack?: string
  ) {
    super(message);
    this.success = success;

    this.errors = errors;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  serializeErrors(): ApiErrorList {
    return this.errors;
  }
}

export class UnauthorizedError extends CustomError {
    statusCode: number = 401;
    errors: ApiErrorList;
    success: boolean;

    constructor(
        message: string = "Unauthorized Request", 
        errors: ApiErrorList = [{ message:"Unauthorized Request" }],
        success: boolean = false,
        stack?: string
    ) {
        super(message);
        this.success = success;

        this.errors = errors;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    serializeErrors(): ApiErrorList {
        return this.errors;
    }
}

export type ApiErrorList = Array<{
    message: string;
    field?: string;
}>;
// Type Guard for ApiErrorList Type
export function isApiErrorList(errors: any): errors is ApiErrorList {
    if (Array.isArray(errors) && 'message' in errors[0]) {
        return true;
    }
    return false;
}

export type ApiErrorTypes = 
    | ApiError 
    | ValidationError
    | NotFoundError
    | BadRequestError
    | UnauthorizedError;

// Type Guard for custom error types
export function isCustomError(err: any): err is ApiErrorTypes {
    return (
        err instanceof ApiError ||
        err instanceof ValidationError ||
        err instanceof NotFoundError ||
        err instanceof BadRequestError ||
        err instanceof UnauthorizedError
    )
}
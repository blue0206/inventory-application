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
        stack?: string, 
        success?: boolean
    ) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.success = success || false;

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
        stack?: string,
        success?: boolean
    ) {
        super(message);
        this.message = message;
        this.success = success || false;
        
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
        stack?: string,
        success?: boolean
    ) {
        super(message);
        this.success = success || false;

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
    stack?: string,
    success?: boolean
  ) {
    super(message);
    this.message = message;
    this.success = success || false;

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

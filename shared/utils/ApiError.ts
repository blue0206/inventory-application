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

type ApiErrorList = Array<{
    message: string;
    field?: string;
}>
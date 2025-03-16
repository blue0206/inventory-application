import type { ApiErrorList } from 'shared';

export class ApiError extends Error {
    readonly __type = 'ApiError';
    statusCode: number;
    error: ApiErrorList | Record<string, unknown> | null;
    message: string;
    success: boolean;

    constructor(
        statusCode: number,
        message: string,
        error: ApiErrorList | Record<string, unknown> | null = null,
        success: boolean = false
    ) {
        super(message);
        this.statusCode = statusCode;
        this.error = error;
        this.message = message;
        this.success = success;
    }
}

export class FetchError extends Error {
    readonly __type = 'FetchError';
    message: string;
    statusCode: undefined; // No status code for Fetch Error

    constructor(
        message: string,
        statusCode: undefined = undefined
    ) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
    }
}

export type CustomDefinedErrorType = ApiError | FetchError;

// Type Guard to check if an error is a custom-defined error, i.e. either CustomError or FetchError.
// Required in async thunk.
export function isCustomDefinedError(error: unknown): error is CustomDefinedErrorType {
    if ((error as ApiError).__type === 'ApiError') {
        return true;
    } else if ((error as FetchError).__type === 'FetchError') {
        return true;
    }
    return false;
}

// Type Guard to check if the error is of type ApiError.
export function isApiError(error: unknown): error is ApiError {
    return (error as ApiError).__type === 'ApiError';
}

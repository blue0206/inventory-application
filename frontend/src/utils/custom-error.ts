import type { ApiErrorList } from 'shared';

export class CustomError extends Error {
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
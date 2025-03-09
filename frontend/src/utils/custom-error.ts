import type { ApiErrorTypes } from 'shared';

export class CustomError extends Error {
    statusCode: number;
    error: ApiErrorTypes | Record<string, unknown> | null;
    message: string;
    success: boolean;

    constructor(
        statusCode: number,
        message: string,
        error: ApiErrorTypes | Record<string, unknown> | null = null,
        success: boolean = false
    ) {
        super(message);
        this.statusCode = statusCode;
        this.error = error;
        this.message = message;
        this.success = success;
    }
}

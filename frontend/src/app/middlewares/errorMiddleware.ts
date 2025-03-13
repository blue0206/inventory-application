import { isRejected, Middleware } from "@reduxjs/toolkit"
import { isCustomDefinedError } from "@/utils/custom-error";

// Middleware for centralized and standardized error handling across the application.
export const errorHandlingMiddleware: Middleware = () => (next) => (action) => {
    // Check if action is rejected, and payload is a custom defined error using type guard.
    if (isRejected(action) && isCustomDefinedError(action.payload)) {
        switch (action.payload.statusCode) {
            case 400:
            break;
            case 401:
            break;
            case 404:
            break;
            case 409:
            break;
            case 422:
            break;
            case 500:
            break;
            default: // For Fetch errors encountered on failed API calls.
        }
    }
    return next(action);
}
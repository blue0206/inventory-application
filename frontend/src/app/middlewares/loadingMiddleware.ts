import { isPending, Middleware } from "@reduxjs/toolkit";

export const loadingMiddleware: Middleware = () => (next) => (action) => {
    if (isPending(action)) {
        // TODO: Show customized loading toast based on action type.
    }
    return next(action);
}
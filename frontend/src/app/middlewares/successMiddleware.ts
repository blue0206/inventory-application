import { Middleware } from "@reduxjs/toolkit";

// Middleware for showing customized notifications when an action is successful
// and to handle any other side effects.
export const successMiddleware: Middleware = () => (next) => (action) => {
    
    
    return next(action);
}
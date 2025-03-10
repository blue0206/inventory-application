import { AppStore } from "../store";
import { Action, Middleware } from "@reduxjs/toolkit"

export const errorHandlingMiddleware = (store: AppStore) => (next: Middleware) => (action: Action) => {
    if (action.type.endsWith('/rejected')) {
        // TODO: Error handling logic here.
    }
}
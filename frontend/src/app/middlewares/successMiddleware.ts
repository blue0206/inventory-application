import { Action, Middleware } from "@reduxjs/toolkit";
import { AppStore } from "../store";

export const successMiddleware = (store: AppStore) => (next: Middleware) => (action: Action) {
    if (action.type.endsWith('/fulfilled')) {
        // TODO: Handle success notifications here.
    }
}
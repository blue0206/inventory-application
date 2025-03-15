import { Middleware } from "@reduxjs/toolkit";
import {
    isListGetAsyncThunkP,
} from "../reduxTypeGuard";
import { toast } from "sonner";

export const loadingMiddleware: Middleware = () => (next) => (action) => {

    if (isListGetAsyncThunkP(action)) {
        if (action.type.includes("pokemon")) {
            toast.loading("Fetching pokemon, please wait...", {
                id: "pokemonListLoading",
            });
        } else {
            toast.loading("Fetching trainers, please wait...", {
                id: "trainerListLoading"
            });
        }
    }

    return next(action);
}
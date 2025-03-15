import { Middleware } from "@reduxjs/toolkit";
import {
    isListGetAsyncThunkFR,
    isListGetAsyncThunkP,
} from "../reduxTypeGuard";
import { toast } from "sonner";

export const loadingMiddleware: Middleware = () => (next) => (action) => {

    // Show loading toast if pokemon or trainer list is getting fetched.
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
    // Remove loading toast if pokemon or trainer list has been successfully fetched
    // or resulted in error.
    if (isListGetAsyncThunkFR(action)) {
        if (action.type.includes("pokemon")) {
            toast.dismiss("pokemonListLoading");
        } else {
            toast.dismiss("trainerListLoading");
        }
    }

    return next(action);
}
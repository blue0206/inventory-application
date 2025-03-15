import { Middleware } from "@reduxjs/toolkit";
import {
    isGetDetailsAsyncThunkFR,
    isGetDetailsAsyncThunkP,
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

    // Show loading toast if pokemon or trainer details is getting fetched.
    if (isGetDetailsAsyncThunkP(action)) {
        if (action.type.includes("Pokemon")) {
            toast.loading("Fetching pokemon details, please wait...", {
                id: "pokemonLoading",
            });
        } else {
            toast.loading("Fetching trainer details, please wait...", {
                id: "trainerLoading"
            });
        }
    }
    // Remove loading toast if pokemon or trainer details has been successfully fetched
    // or resulted in error.
    if (isGetDetailsAsyncThunkFR(action)) {
        if (action.type.includes("Pokemon")) {
            toast.dismiss("pokemonLoading");
        } else {
            toast.dismiss("trainerLoading");
        }
    }

    return next(action);
}
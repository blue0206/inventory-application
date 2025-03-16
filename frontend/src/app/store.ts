import { configureStore } from "@reduxjs/toolkit";
import trainerSlice from "../features/trainer/trainerSlice";
import pokemonSlice from "../features/pokemon/pokemonSlice";
import errorSlice from "../features/error/errorSlice";
import { loadingMiddleware, errorHandlingMiddleware, successMiddleware } from "./middlewares";

export const store = configureStore({
    reducer: {
        trainer: trainerSlice,
        pokemon: pokemonSlice,
        error: errorSlice
    },
    middleware: (getDefaultMiddleware) =>  getDefaultMiddleware().concat(
                loadingMiddleware,
                errorHandlingMiddleware,
                successMiddleware
            )
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
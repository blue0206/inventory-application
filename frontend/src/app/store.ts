import { configureStore } from "@reduxjs/toolkit";
import trainerSlice from "../features/trainer/trainerSlice";
import pokemonSlice from "../features/pokemon/pokemonSlice";
import dataSlice from "../features/data/dataSlice";
import errorSlice from "../features/error/errorSlice";
import darkModeSlice from "../features/darkMode/darkModeSlice";
import { loadingMiddleware, errorHandlingMiddleware, successMiddleware } from "./middlewares";

export const store = configureStore({
    reducer: {
        trainer: trainerSlice,
        pokemon: pokemonSlice,
        data: dataSlice,
        error: errorSlice,
        darkMode: darkModeSlice
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
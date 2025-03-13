import { configureStore } from "@reduxjs/toolkit";
import trainerSlice from "../features/trainer/trainerSlice";
import pokemonSlice from "../features/pokemon/pokemonSlice";
import dataSlice from "../features/data/dataSlice";
import formSlice from "../features/form/formSlice";
import errorSlice from "../features/error/errorSlice";
import { errorHandlingMiddleware } from "./middlewares/errorMiddleware";
import { successMiddleware } from "./middlewares/successMiddleware";
import { pendingMiddleware } from "./middlewares/pendingMiddleware";

export const store = configureStore({
    reducer: {
        trainer: trainerSlice,
        pokemon: pokemonSlice,
        data: dataSlice,
        form: formSlice,
        error: errorSlice
    },
    middleware: (getDefaultMiddleware) =>  getDefaultMiddleware().concat(
                pendingMiddleware,
                errorHandlingMiddleware,
                successMiddleware
            )
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
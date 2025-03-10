import { configureStore } from "@reduxjs/toolkit";
import trainerSlice from "../features/trainer/trainerSlice";
import pokemonSlice from "../features/pokemon/pokemonSlice";
import errorSlice from "../features/error/errorSlice";
import { errorHandlingMiddleware } from "./middlewares/errorMiddleware";
import { successMiddleware } from "./middlewares/successMiddleware";

export const store = configureStore({
    reducer: {
        trainer: trainerSlice,
        pokemon: pokemonSlice,
        error: errorSlice
    },
    middleware: (getDefaultMiddleware) =>  getDefaultMiddleware().concat(
                errorHandlingMiddleware,
                successMiddleware
            )
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

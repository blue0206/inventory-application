import {
  fetchPokemon,
  fetchTrainer,
  deletePokemon,
  deleteTrainer,
} from "../features/data/dataThunks";
import { fetchPokemonList } from "../features/pokemon/pokemonSlice";
import { fetchTrainersList } from "../features/trainer/trainerSlice";
import {
  createTrainer,
  updateTrainer,
  createPokemon,
  updatePokemon,
} from "../features/form/formThunks";
import { isAnyOf } from "@reduxjs/toolkit";

/**
 *  This module exports redux type guards for async thunks
 *  generated using `isAnyOf` utility.
 *  This will greatly simplify the code in middlewares
 *  helping ascertain perfectly if an action is of a certain type.
 */

// Type Guard to identify if an action is a fulfilled async thunk action.
export const isAsyncThunkF = isAnyOf(
    fetchPokemonList.fulfilled,
    fetchPokemon.fulfilled,
    fetchTrainersList.fulfilled,
    fetchTrainer.fulfilled,
    createTrainer.fulfilled,
    updateTrainer.fulfilled,
    createPokemon.fulfilled,
    updatePokemon.fulfilled,
    deletePokemon.fulfilled,
    deleteTrainer.fulfilled
);

// Type Guard to identify if an action is a fulfilled async thunk action
// that makes pokemon DELETE request.
export const isPokemonDeleteAsyncThunkF = isAnyOf(deletePokemon.fulfilled);

// Type Guard to identify if an action is a fulfilled async thunk action
// that makes trainer DELETE request.
export const isTrainerDeleteAsyncThunkF = isAnyOf(deleteTrainer.fulfilled);

// Type Guard to identify if an action is a FULFILLED async thunk action
// that makes trainer create or update request.
export const isCreateOrUpdateTrainerAsyncThunkF = isAnyOf(
    createTrainer.fulfilled,
    updateTrainer.fulfilled
);
// Type Guard to identify if an action is a REJECTED async thunk action
// that makes trainer create or update request.
export const isCreateOrUpdateTrainerAsyncThunkR = isAnyOf(
    createTrainer.rejected,
    updateTrainer.rejected
);

// Type Guard to identify if an action is a FULFILLED async thunk action
// that makes pokemon create or update request.
export const isCreateOrUpdatePokemonAsyncThunkF = isAnyOf(
    createPokemon.fulfilled,
    updatePokemon.fulfilled
);
// Type Guard to identify if an action is a REJECTED async thunk action
// that makes pokemon create or update request.
export const isCreateOrUpdatePokemonAsyncThunkR = isAnyOf(
    createPokemon.rejected,
    updatePokemon.rejected
);

// Type Guard to identify if an action is a PENDING async thunk function
// that makes get request for list.
export const isListGetAsyncThunkP = isAnyOf(fetchPokemonList.pending, fetchTrainersList.pending);
// FULFILLED or REJECTED
export const isListGetAsyncThunkFR = isAnyOf(
    fetchPokemonList.fulfilled, 
    fetchTrainersList.fulfilled,
    fetchPokemonList.rejected,
    fetchTrainersList.rejected
);
// FULFILLED
export const isListGetAsyncThunkF = isAnyOf(fetchPokemonList.fulfilled, fetchTrainersList.fulfilled);

// Type Guard to identify if an action is a PENDING async thunk function
// that gets individual pokemon/trainer details.
export const isGetDetailsAsyncThunkP = isAnyOf(fetchPokemon.pending, fetchTrainer.pending);
// FULFILLED or REJECTED
export const isGetDetailsAsyncThunkFR = isAnyOf(
    fetchPokemon.fulfilled,
    fetchTrainer.fulfilled,
    fetchPokemon.rejected,
    fetchTrainer.rejected
);
// FULFILLED
export const isGetDetailsAsyncThunkF = isAnyOf(fetchPokemon.fulfilled, fetchTrainer.fulfilled);

// Type Guard to identify if an action is a PENDING async thunk function
// that gets individual pokemon/trainer details.
export const isNotGetAsyncThunkP = isAnyOf(
    createTrainer.pending,
    updateTrainer.pending,
    createPokemon.pending,
    updatePokemon.pending,
    deletePokemon.pending,
    deleteTrainer.pending
)
// FULFILLED or REJECTED
export const isNotGetAsyncThunkFR = isAnyOf(
    createTrainer.fulfilled,
    updateTrainer.fulfilled,
    createPokemon.fulfilled,
    updatePokemon.fulfilled,
    deletePokemon.fulfilled,
    deleteTrainer.fulfilled,
    createTrainer.rejected,
    updateTrainer.rejected,
    createPokemon.rejected,
    updatePokemon.rejected,
    deletePokemon.rejected,
    deleteTrainer.rejected
);
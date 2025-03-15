import {
  fetchPokemon,
  fetchTrainer,
  deletePokemon,
  deleteTrainer,
} from "../features/data/dataSlice";
import { fetchPokemonList } from "../features/pokemon/pokemonSlice";
import { fetchTrainersList } from "../features/trainer/trainerSlice";
import {
  createTrainer,
  updateTrainer,
  createPokemon,
  updatePokemon,
} from "../features/form/formSlice";
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
// that does not make DELETE requests.
export const isNotDeleteAsyncThunkF = isAnyOf(
    fetchPokemonList.fulfilled,
    fetchPokemon.fulfilled,
    fetchTrainersList.fulfilled,
    fetchTrainer.fulfilled,
    createTrainer.fulfilled,
    updateTrainer.fulfilled,
    createPokemon.fulfilled,
    updatePokemon.fulfilled
);

// Type Guard to identify if an action is a fulfilled async thunk action
// that makes pokemon DELETE request.
export const isPokemonDeleteAsyncThunkF = isAnyOf(deletePokemon.fulfilled);

// Type Guard to identify if an action is a fulfilled async thunk action
// that makes trainer DELETE request.
export const isTrainerDeleteAsyncThunkF = isAnyOf(deleteTrainer.fulfilled);

// Type Guard to identify if an action is a fulfilled async thunk action
// that makes trainer create or update request.
export const isCreateOrUpdateTrainerAsyncThunkF = isAnyOf(
    createTrainer.fulfilled,
    updateTrainer.fulfilled
);

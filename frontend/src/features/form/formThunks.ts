import { apiClient } from "@/utils/api-client";
import { FetchError, isCustomDefinedError } from "@/utils/custom-error";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiResponse, PokemonRequestBody, TrainerRequestBody } from "shared";
import { UpdatePokemonRequestType, UpdateTrainerRequestType } from "../../types/requestTypes";
/**
 * The purpose of this module is to store thunks regarding specific
 * tasks like creating/updating trainer/pokemon. The actual data
 * pertaining to trainer/pokemon is not required and hence there
 * is no state/slice created to hold them.
 * 
 * The reason these thunks have been created and the form data related 
 * api calls are not being handled in local component is because the 
 * error handling and notifications showcase has been standardized via 
 * redux middlewares and to trigger that, a request made via async thunk
 * is imperative.
 */

// Thunk for creating new trainer.
export const createTrainer = 
createAsyncThunk<
    ApiResponse<number>, 
    TrainerRequestBody
>('form/createTrainer', async (trainerData: TrainerRequestBody, { rejectWithValue }) => {
    try {
        const response: ApiResponse<number> = await apiClient.createTrainer(trainerData);
        return response;
    } catch (error) {
        // Actions shouldn't take class instances, hence destructure errors to object.
        if (isCustomDefinedError(error)) {
            return rejectWithValue({...error});
        }
        return rejectWithValue({...new FetchError("Something went wrong.")});
    }
});

// Thunk for updating existing trainer.
export const updateTrainer = 
createAsyncThunk<
    ApiResponse<number>, 
    UpdateTrainerRequestType
>('form/updateTrainer', async ({ trainerData, id }: UpdateTrainerRequestType, { rejectWithValue }) => {
    try {
        const response: ApiResponse<number> = await apiClient.updateTrainer(trainerData, id);
        return response;
    } catch (error) {
        // Actions shouldn't take class instances, hence destructure errors to object.
        if (isCustomDefinedError(error)) {
            return rejectWithValue({...error});
        }
        return rejectWithValue({...new FetchError("Something went wrong.")});
    }
});

// Thunk for creating new pokemon.
export const createPokemon = 
createAsyncThunk<
    ApiResponse<number>, 
    PokemonRequestBody
>('form/createPokemon', async (pokemonData: PokemonRequestBody, { rejectWithValue }) => {
    try {
        const response: ApiResponse<number> = await apiClient.createPokemon(pokemonData);
        return response;
    } catch (error) {
        // Actions shouldn't take class instances, hence destructure errors to object.
        if (isCustomDefinedError(error)) {
            return rejectWithValue({...error});
        }
        return rejectWithValue({...new FetchError("Something went wrong.")});
    }
});

// Thunk for updating existing pokemon.
export const updatePokemon = 
createAsyncThunk<
    ApiResponse<number>, 
    UpdatePokemonRequestType
>('form/updatePokemon', async ({ pokemonData, id }: UpdatePokemonRequestType, { rejectWithValue }) => {
    try {
        const response: ApiResponse<number> = await apiClient.updatePokemon(pokemonData, id);
        return response;
    } catch (error) {
        if (isCustomDefinedError(error)) {
            return rejectWithValue({...error});
        }
        return rejectWithValue({...new FetchError("Something went wrong.")});
    }
});
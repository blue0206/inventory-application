import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "@/app/hooks";
import { FetchError, isCustomDefinedError } from "@/utils/custom-error";
import { apiClient } from "../../utils/api-client";
import { Pokemon, TrainerWithRelation, ApiResponse } from "shared";
import { DeleteParamsType } from "../../types/requestTypes";

type Status = "idle" | "loading" | "succeeded" | "failed";
type DataState = {
    trainerDataStatus: Status;
    pokemonDataStatus: Status;
}

const initialState: DataState = {
    trainerDataStatus: 'idle',
    pokemonDataStatus: 'idle'
}

/**
 * The purpose of this slice is to handle thunks regarding specific
 * tasks like getting specific trainer/pokemon data in order to display
 * them on a separate dynamic route. The actual data pertaining to 
 * trainer/pokemon is not required to be globally available and hence there
 * is no Redux state created to hold them.
 * 
 * The reason this slice has been created and the fetching of data is not
 * being handled in local component is because the error handling
 * and notifications showcase has been standardized and centralized via redux 
 * middlewares and to trigger that, a request made via async thunk
 * is imperative.
 */
const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {}
});

export const fetchTrainer = 
createAppAsyncThunk<
    ApiResponse<TrainerWithRelation>, 
    number
>('data/fetchTrainer', async (id: number, { rejectWithValue }) => {
    try {
        const response: ApiResponse<TrainerWithRelation> = await apiClient.getTrainerById(id);
        return response;
    } catch (error) {
        if (isCustomDefinedError(error)) {
            return rejectWithValue({...error});
        }
        return rejectWithValue({...new FetchError("Something went wrong.")})
    }
});

export const deleteTrainer = 
createAppAsyncThunk<void, DeleteParamsType>('data/deleteTrainer', async ({ id, secretKey }: DeleteParamsType, { rejectWithValue }) => {
    try {
        await apiClient.deleteTrainer(id, secretKey);
    } catch (error) {
        if (isCustomDefinedError(error)) {
            return rejectWithValue({...error});
        }
        return rejectWithValue({...new FetchError("Something went wrong.")});
    }
});

export const fetchPokemon = 
createAppAsyncThunk<
    ApiResponse<Pokemon>, 
    number
>('data/fetchPokemon', async (id: number, { rejectWithValue }) => {
    try {
        const response: ApiResponse<Pokemon> = await apiClient.getPokemonById(id);
        return response;
    } catch (error) {
        if (isCustomDefinedError(error)) {
            return rejectWithValue({...error});
        }
        return rejectWithValue({...new FetchError("Something went wrong.")});
    }
});

export const deletePokemon = 
createAppAsyncThunk<void, DeleteParamsType>('data/deletePokemon', async ({ id, secretKey }: DeleteParamsType, { rejectWithValue }) => {
    try {
        await apiClient.deletePokemon(id, secretKey);
    } catch (error) {
        if (isCustomDefinedError(error)) {
            return rejectWithValue({...error});
        }
        return rejectWithValue({...new FetchError("Something went wrong.")});
    }
});

export default dataSlice.reducer;

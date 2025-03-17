import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "../../app/hooks";
import { FetchError, isCustomDefinedError } from "@/utils/custom-error";
import { apiClient } from "../../utils/api-client";
import { Pokemon, TrainerWithRelation, ApiResponse } from "shared";
import { DeleteParamsType } from "../../types/requestTypes";

type DataState = {
    trainerLoading: boolean;
    pokemonLoading: boolean;
}

const initialState: DataState = {
    trainerLoading: false,
    pokemonLoading: false
}

/**
 * The purpose of this slice is to set loading state while thunks perform
 * tasks like getting specific trainer/pokemon data in order to display
 * them on a separate dynamic route. The actual data pertaining to 
 * trainer/pokemon is not required to be globally available and hence there
 * is no Redux state created to hold them. Only the loading state is needed.
 */
const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setTrainerLoadingStatus(state, action: PayloadAction<boolean>) {
            state.trainerLoading = action.payload;
            return state;
        },
        setPokemonLoadingStatus(state, action: PayloadAction<boolean>) {
            state.pokemonLoading = action.payload;
            return state;
        }
    }
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
createAppAsyncThunk<void, DeleteParamsType>('data/deleteTrainer', async ({ id, data }: DeleteParamsType, { rejectWithValue }) => {
    try {
        await apiClient.deleteTrainer(data, id);
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
createAppAsyncThunk<void, DeleteParamsType>('data/deletePokemon', async ({ id, data }: DeleteParamsType, { rejectWithValue }) => {
    try {
        await apiClient.deletePokemon(data, id);
    } catch (error) {
        if (isCustomDefinedError(error)) {
            return rejectWithValue({...error});
        }
        return rejectWithValue({...new FetchError("Something went wrong.")});
    }
});

export default dataSlice.reducer;
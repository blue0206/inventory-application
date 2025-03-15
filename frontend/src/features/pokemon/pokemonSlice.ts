import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "../../app/hooks";
import type { Pokemon } from 'shared';
import { ApiResponse } from "shared";
import { apiClient } from "../../utils/api-client";
import { FetchError, isCustomDefinedError } from "../../utils/custom-error";

type PokemonState = {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    pokemonList: Array<Pokemon>
}

const initialState: PokemonState = {
    status: 'idle',
    pokemonList: []
};

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.status = "idle";
            return state;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchPokemonList.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchPokemonList.fulfilled, (state, action: PayloadAction<ApiResponse<Array<Pokemon>>>) => {
            state.status = 'succeeded';
            state.pokemonList = action.payload.data;
        })
        .addCase(fetchPokemonList.rejected, (state) => {
            state.status = 'failed';
        })
    },
    selectors: {
        getPokemonList: (state: PokemonState) => state.pokemonList,
        getStatus: (state: PokemonState) => state.status
    }
});

export const fetchPokemonList = 
createAppAsyncThunk<ApiResponse<Array<Pokemon>>>('pokemon/fetchPokemonList', async (_, { rejectWithValue }) => {
    try {
        const response: ApiResponse<Array<Pokemon>> = await apiClient.getPokemonList();
        return response;     
    } catch (error) {
        // Actions shouldn't take class instances, hence destructure errors to object.
        if (isCustomDefinedError(error)) {
            return rejectWithValue({...error});
        }
        return rejectWithValue({...new FetchError("Something went wrong.")});
    }
});

export default pokemonSlice.reducer;
export const { resetStatus } = pokemonSlice.actions;
export const {
    getPokemonList,
    getStatus
} = pokemonSlice.selectors;
import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "../../app/hooks";
import type { Pokemon } from 'shared';
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
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchPokemonList.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchPokemonList.fulfilled, (state) => {
            state.status = 'succeeded';
        })
        .addCase(fetchPokemonList.rejected, (state) => {
            state.status = 'failed';
        })
    },
    selectors: {
        getPokemonList: (state: PokemonState) => state.pokemonList
    }
});

export const fetchPokemonList = 
createAppAsyncThunk<Array<Pokemon>>('pokemon/fetchPokemonList', async (_, { rejectWithValue }) => {
    try {
        const response: Array<Pokemon> = await apiClient.getPokemonList();
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
export const {
    getPokemonList
} = pokemonSlice.selectors;

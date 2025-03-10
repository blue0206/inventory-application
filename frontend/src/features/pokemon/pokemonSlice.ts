import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "../../app/hooks";
import type { Pokemon } from 'shared';
import { apiClient } from "../../utils/api-client";

export const fetchPokemonList = createAppAsyncThunk('pokemon/fetchPokemonList', async (_, { rejectWithValue }) => {
    try {
        const response = await apiClient.getPokemonList();
        return response;
        
    } catch (error) {
        rejectWithValue(error);
    }
});

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
        .addCase(fetchPokemonList.pending, (state, action) => {
            state.status = 'loading';
        })
        .addCase(fetchPokemonList.fulfilled, (state, action) => {
            state.status = 'succeeded';
        })
        .addCase(fetchPokemonList.rejected, (state, action) => {
            state.status = 'failed';
        })
    },
    selectors: {
        getPokemonList: (state: PokemonState) => state.pokemonList
    }
});

export default pokemonSlice.reducer;
export const {
    getPokemonList
} = pokemonSlice.selectors;
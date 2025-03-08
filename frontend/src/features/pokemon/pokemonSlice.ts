import { createSlice } from "@reduxjs/toolkit";
import type { Pokemon } from 'shared';

const initialState: Array<Pokemon> = [];

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {}
});

export default pokemonSlice.reducer;
const {} = pokemonSlice.actions;
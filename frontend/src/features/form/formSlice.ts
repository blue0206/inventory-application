import { createSlice } from "@reduxjs/toolkit";

type FormState = {
    trainerFormStatus: 'idle' | 'loading' | 'fulfilled' | 'rejected';
    pokemonFormStatus: 'idle' | 'loading' | 'fulfilled' | 'rejected';
}

const initialState: FormState = {
    trainerFormStatus: 'idle',
    pokemonFormStatus: 'idle'
}

export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {},
    extraReducers: (builder) => {}
});


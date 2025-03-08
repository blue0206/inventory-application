import { createSlice } from "@reduxjs/toolkit";
import type { Trainer } from 'shared';

const initialState: Array<Trainer> = [];

const trainerSlice = createSlice({
    name: 'trainer',
    initialState,
    reducers: {}
});

export default trainerSlice.reducer;
export const {} = trainerSlice.actions;
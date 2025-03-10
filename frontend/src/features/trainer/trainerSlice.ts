import { createSlice } from "@reduxjs/toolkit";
import type { Trainer } from 'shared';

type TrainerState = {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    trainersList: Array<Trainer>
}

const initialState: TrainerState = {
    status: 'idle',
    trainersList: []
};

const trainerSlice = createSlice({
    name: 'trainer',
    initialState,
    reducers: {}
});

export default trainerSlice.reducer;
export const {} = trainerSlice.actions;
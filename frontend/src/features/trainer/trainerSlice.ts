import { apiClient } from "../../utils/api-client";
import { createAppAsyncThunk } from "../../app/hooks";
import { createSlice } from "@reduxjs/toolkit";
import type { Trainer } from 'shared';

export const fetchTrainersList = createAppAsyncThunk('trainer/fetchTrainers', async (_, { rejectWithValue }) => {
    try {
        const response = await apiClient.getTrainersList();
        return response;
    } catch (error) {
        return rejectWithValue(error);
    }
});

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
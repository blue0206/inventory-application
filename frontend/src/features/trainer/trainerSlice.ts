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
    name: 'trainers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchTrainersList.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(fetchTrainersList.fulfilled, (state, action) => {
            state.status = "succeeded";

        })
        .addCase(fetchTrainersList.rejected, (state, action) => {
            state.status = "failed";
        })
    }
});

export default trainerSlice.reducer;
export const {} = trainerSlice.actions;
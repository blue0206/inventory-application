import { apiClient } from "../../utils/api-client";
import { createAppAsyncThunk } from "../../app/hooks";
import { createSlice } from "@reduxjs/toolkit";
import type { Trainer } from 'shared';
import { FetchError, isCustomDefinedError } from "../../utils/custom-error";

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
    },
    selectors: {
        getTrainersList: (state: TrainerState) => state.trainersList
    }
});

export const fetchTrainersList = 
createAppAsyncThunk<Array<Trainer>>('trainer/fetchTrainers', async (_, { rejectWithValue }) => {
    try {
        const response: Array<Trainer> = await apiClient.getTrainersList();
        return response;
    } catch (error) {
        // Actions shouldn't take class instances, hence destructure errors to object.
        if (isCustomDefinedError(error)) {
            return rejectWithValue({...error});
        }
        return rejectWithValue({...new FetchError("Something went wrong!")});
    }
});

export default trainerSlice.reducer;
export const {
    getTrainersList
} = trainerSlice.selectors;

import { apiClient } from "../../utils/api-client";
import { createAppAsyncThunk } from "../../app/hooks";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Trainer } from 'shared';
import { ApiResponse } from "shared";
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
    reducers: {
        resetStatus: (state) => {
            state.status = "idle";
            return state;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchTrainersList.pending, (state) => {
            state.status = "loading";
        })
        .addCase(fetchTrainersList.fulfilled, (state, action: PayloadAction<ApiResponse<Array<Trainer>>>) => {
            state.status = "succeeded";
            state.trainersList = action.payload.data;
        })
        .addCase(fetchTrainersList.rejected, (state) => {
            state.status = "failed";
        })
    },
    selectors: {
        getTrainersList: (state: TrainerState) => state.trainersList,
        getStatus: (state: TrainerState) => state.status
    }
});

export const fetchTrainersList = 
createAppAsyncThunk<ApiResponse<Array<Trainer>>>('trainer/fetchTrainers', async (_, { rejectWithValue }) => {
    try {
        const response: ApiResponse<Array<Trainer>> = await apiClient.getTrainersList();
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
export const { resetStatus } = trainerSlice.actions;
export const {
    getTrainersList,
    getStatus
} = trainerSlice.selectors;
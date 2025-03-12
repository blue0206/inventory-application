import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "@/app/hooks";
import { FetchError, isCustomDefinedError } from "@/utils/custom-error";
import { apiClient } from "../../utils/api-client";

type Status = "idle" | "loading" | "succeeded" | "failed";
type DataState = {
    trainerDataStatus: Status;
    pokemonDataStatus: Status;
}

const initialState: DataState = {
    trainerDataStatus: 'idle',
    pokemonDataStatus: 'idle'
}

/**
 * The purpose of this slice is to handle thunks regarding specific
 * tasks like getting specific trainer/pokemon data in order to display
 * them on a separate dynamic route. The actual data pertaining to 
 * trainer/pokemon is not required to be globally available and hence there
 * is no Redux state created to hold them.
 * 
 * The reason this slice has been created and the fetching of data is not
 * being handled in local component is because the error handling
 * and notifications showcase has been standardized and centralized via redux 
 * middlewares and to trigger that, a request made via async thunk
 * is imperative.
 */
const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {}
});

export type deleteParamsType = {
    id: number | string;
    secretKey: string;
}

export const deleteTrainer = 
createAppAsyncThunk('data/deleteTrainer', async ({ id, secretKey }: deleteParamsType, { rejectWithValue }) => {
    try {
        const response: void = await apiClient.deleteTrainer(id, secretKey);
        return response;
    } catch (error) {
        if (isCustomDefinedError(error)) {
            return rejectWithValue({...error});
        }
        return rejectWithValue({...new FetchError("Something went wrong.")});
    }
});

export default dataSlice.reducer;

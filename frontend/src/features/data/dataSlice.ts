import { createSlice } from "@reduxjs/toolkit";

type Status = "idle" | "loading" | "succeeded" | "failed";
type DataState = {
    trainerDataStatus: Status;
    pokemonDataStatus: Status;
}

const initialState: DataState = {
    trainerDataStatus: 'idle',
    pokemonDataStatus: 'idle'
}

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {}
});

export default dataSlice.reducer;
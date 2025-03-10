import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {}
});

export default toastSlice.reducer;
export const {} = toastSlice.actions;
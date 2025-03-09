import { createSlice } from '@reduxjs/toolkit';
import { ApiErrorTypes } from 'shared';

type ErrorState = {
    hasError: boolean;
    error: ApiErrorTypes | Record<string, unknown> | null;
    message: string;
}

const initialState: ErrorState = {
    hasError: false,
    error: null,
    message: ''
}

const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {}
});

export default errorSlice.reducer;
export const {} = errorSlice.actions;
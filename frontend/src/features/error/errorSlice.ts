import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiErrorList } from 'shared';
import { CustomError } from '../../utils/custom-error';

type ErrorState = {
    hasError: boolean;
    error: ApiErrorList | Record<string, unknown> | null;
    message: string;
    code: number;
}

const initialState: ErrorState = {
    hasError: false,
    error: null,
    message: '',
    code: 200
}

const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<CustomError>) => {
            state.hasError = true;
            state.message = action.payload.message;
            state.error = action.payload.error;
            state.code = action.payload.statusCode;
            return state;
        }
    }
});

export default errorSlice.reducer;
export const {
    setError
} = errorSlice.actions;
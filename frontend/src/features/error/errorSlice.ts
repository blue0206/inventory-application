import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiErrorList } from 'shared';
import { CustomDefinedErrorType, isApiError } from '../../utils/custom-error';

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
        setError: (state, action: PayloadAction<CustomDefinedErrorType>) => {
            state.hasError = true;
            state.message = action.payload.message;
            if (isApiError(action.payload)) {
                state.error = action.payload?.error || null;
                state.code = action.payload.statusCode;
            }
            return state;
        },
        clearError: (state) => {
            state.hasError = false;
            state.error = null;
            state.message = '';
            state.code = 200;
            return state;
        }
    },
    selectors: {
        getError: (state: ErrorState) => state
    }
});

export default errorSlice.reducer;
export const {
    setError,
    clearError
} = errorSlice.actions;
export const {
    getError
} = errorSlice.selectors;

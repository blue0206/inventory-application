import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiErrorList } from 'shared';
import { CustomDefinedErrorType, isApiError } from '../../utils/custom-error';

type ErrorState = {
    hasError: boolean;
    error: ApiErrorList | null;
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
        }
    },
    selectors: {
        getError: (state: ErrorState) => state
    }
});

export default errorSlice.reducer;
export const {
    setError
} = errorSlice.actions;
export const {
    getError
} = errorSlice.selectors;

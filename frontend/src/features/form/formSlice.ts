import { createSlice } from "@reduxjs/toolkit";

type FormState = {
    trainerFormLoading: boolean;
    pokemonFormLoading: boolean;
}

const initialState: FormState = {
    trainerFormLoading: false,
    pokemonFormLoading: false
}

/**
 * The purpose of this slice is to handle thunks regarding specific
 * tasks like creating/updating trainer/pokemon. The actual data
 * pertaining to trainer/pokemon is not required and hence there
 * is no state created to hold them.
 * 
 * The reason this slice has been created and the form data is not
 * being handled in local component is because the error handling
 * and notifications showcase has been standardized via redux 
 * middlewares and to trigger that, a request made via async thunk
 * is imperative.
 */
const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {},
    extraReducers: (builder) => {}
});

export default formSlice.reducer;

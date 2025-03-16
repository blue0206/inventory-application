import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
}

type ThemeProviderState = {
    theme: Theme;
}

const initialState: ThemeProviderState = {
    theme: "dark"
}

const darkModeSlice = createSlice({
    name: "darkMode",
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<Theme>) => {
            state.theme = action.payload
        }
    },
    selectors: {
        getTheme: (state) => state.theme
    }
});

export default darkModeSlice.reducer;
export const {
    setTheme
} = darkModeSlice.actions;
export const {
    getTheme
} = darkModeSlice.selectors;
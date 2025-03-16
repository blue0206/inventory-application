import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Theme = "dark" | "light" | "system";

type ThemeState = {
    theme: Theme;
    resolvedTheme?: "light" | "dark";
}

const getInitialState = (): ThemeState => {
    if (typeof localStorage !== 'undefined') {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) {
            return {
                theme: storedTheme as Theme
            }
        }
    }
    return { theme: "system" };
}

const darkModeSlice = createSlice({
    name: "darkMode",
    initialState: getInitialState,
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
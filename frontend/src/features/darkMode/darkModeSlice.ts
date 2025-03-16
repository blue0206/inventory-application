import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Theme = "dark" | "light" | "system";

type ThemeState = {
    theme: Theme;
    resolvedTheme?: "light" | "dark";   // Actual theme to be used.
}

// Gets initial theme based on data in local storage and sets initialState.
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
            state.theme = action.payload;
            // Update local storage with new theme.
            localStorage.setItem("theme", action.payload);

            // Update resolved theme by ascertaining system theme.
            if (action.payload === "system") {
                state.resolvedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches 
                ? "dark" 
                : "light";
            } else {
                state.resolvedTheme = action.payload;
            }
        },
        toggleTheme: (state) => {
            const newTheme = state.theme === "dark" ? "light" : "dark";
            state.theme = newTheme;
            localStorage.setItem("theme", newTheme);
            state.resolvedTheme = newTheme;
        }
    },
    selectors: {
        getResolvedTheme: (state) => state.resolvedTheme,
        getTheme: (state) => state.theme
    }
});

export default darkModeSlice.reducer;
export const {
    setTheme,
    toggleTheme
} = darkModeSlice.actions;
export const {
    getResolvedTheme,
    getTheme
} = darkModeSlice.selectors;
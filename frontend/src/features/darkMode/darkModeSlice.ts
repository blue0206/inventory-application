import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Theme = "dark" | "light" | "system";

type ThemeState = {
    theme: Theme;
    resolvedTheme?: "light" | "dark";   // Actual theme to be used.
}

// Gets initial theme based on data in local storage and sets initialState.
const getInitialState = (): ThemeState => {
    const storedTheme = typeof localStorage !== "undefined" 
        ? localStorage.getItem("theme") as Theme
        : undefined;
    
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

    return {
        theme: storedTheme || "system",
        resolvedTheme: storedTheme === "system" ? systemTheme : (storedTheme as "light" | "dark") || systemTheme
    }
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
        }
    },
    selectors: {
        getResolvedTheme: (state) => state.resolvedTheme,
        getTheme: (state) => state.theme
    }
});

export default darkModeSlice.reducer;
export const {
    setTheme
} = darkModeSlice.actions;
export const {
    getResolvedTheme,
    getTheme
} = darkModeSlice.selectors;
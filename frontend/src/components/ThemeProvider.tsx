import { useEffect } from "react";
import { getResolvedTheme, setTheme } from "../features/darkMode/darkModeSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

type ThemeProviderProps = {
    children: React.ReactNode
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
    const dispatch = useAppDispatch();
    const resolvedTheme = useAppSelector(getResolvedTheme);

    // Set theme on the root element.
    useEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove("light", "dark")

        if (resolvedTheme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.add("light");
        }
    }, [resolvedTheme]);

    // Check for system theme changes and update theme state.
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const handleSystemChange = () => {
            dispatch(setTheme("system"));
        }

        mediaQuery.addEventListener("change", handleSystemChange);

        return () => {
            mediaQuery.removeEventListener("change", handleSystemChange);
        }
    }, [dispatch]);

    return (
        <>
            {children}
        </>
    );
}
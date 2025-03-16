import { useEffect } from "react";
import { getTheme } from "../features/darkMode/darkModeSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

type ThemeProviderProps = {
    children: React.ReactNode
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
    const dispatch = useAppDispatch();
    const resolvedTheme = useAppSelector(getTheme);

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

    return (
        <></>
    );
}
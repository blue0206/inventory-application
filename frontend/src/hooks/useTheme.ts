import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { getResolvedTheme, getTheme, setTheme, toggleTheme, Theme } from "@/features/darkMode/darkModeSlice";

export const useTheme = () => {
    const dispatch = useAppDispatch();
    const theme = useAppSelector(getTheme);
    const resolvedTheme = useAppSelector(getResolvedTheme);

    return {
        theme,
        resolvedTheme,
        setTheme: (theme: Theme) => dispatch(setTheme(theme)),
        toggleTheme: () => dispatch(toggleTheme())
    }
}

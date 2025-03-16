import { NavigateOptions } from "react-router";

// Custom navigation service to navigate from redux middlewares.
let navigator: ((path: string, options?: NavigateOptions) => void);

export const navigationService = {
    setNavigator(nav: (path: string, options?: NavigateOptions) => void) {
        navigator = nav;
    },
    navigate(path: string, options?: NavigateOptions) {
        if (navigator) navigator(path, options);
    }
}

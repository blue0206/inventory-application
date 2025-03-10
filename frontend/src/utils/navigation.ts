// Custom navigation service to navigate from redux middlewares.

let navigator: ((path: string) => void);

export const navigationService = {
    setNavigator(nav: (path: string) => void) {
        navigator = nav;
    },
    navigate(path: string) {
        if (navigator) navigator(path);
    }
}

import { Middleware } from "@reduxjs/toolkit";
import { 
    isCreateOrUpdatePokemonAsyncThunkF,
    isCreateOrUpdateTrainerAsyncThunkF,
    isGetDetailsAsyncThunkF,
    isListGetAsyncThunkF,
    isPokemonDeleteAsyncThunkF, 
    isTrainerDeleteAsyncThunkF
} from "../reduxTypeGuard";
import { toast } from "sonner";
import { navigationService } from "@/utils/navigation";
import { resetStatus as resetTrainerListStatus } from "@/features/trainer/trainerSlice";
import { resetStatus as resetPokemonListStatus } from "@/features/pokemon/pokemonSlice";

// Middleware for showing customized notifications when an action is successful
// and to handle any other side effects.
export const successMiddleware: Middleware = (store) => (next) => (action) => {

    if (isGetDetailsAsyncThunkF(action)) {
        // When user successfully completes a create/update request, a corresponding
        // toast is shown and the user is redirected to the page of the created/updated
        // trainer/pokemon where another toast is shown. 
        // Therefore, we conditionally show the toast on trainer/pokemon page only if
        // there are no create/update toast present.
        const toasts = toast.getToasts().filter(tst => tst.id === "createOrUpdate");
        if (toasts.length === 0) {
            toast.success(action.payload.message, {
                duration: 4000
            });
        }
    }
    if (isListGetAsyncThunkF(action)) {
        // When a delete request is completed successfully, a corresponding
        // toast is shown and the user is redirected to the trainer/pokemon list page
        // where another toast is shown. 
        // Therefore, we conditionally show the toast on trainer/pokemon list page only if
        // there are no delete request toast present.
        const toasts = toast.getToasts().filter(tst => tst.id === "deleteToast");
        if (toasts.length === 0) {
            toast.success(action.payload.message, {
                duration: 4000
            });
        }
    }
    if (isCreateOrUpdateTrainerAsyncThunkF(action)) {
        // Since a trainer has been created or updated, we need to 
        // redirect user to that trainer's detail page and show toast.
        navigationService.navigate(`/trainers/${action.payload.data}`);
        toast.success(action.payload.message, {
            duration: 4000,
            id: "createOrUpdate"
        });
    }
    if (isCreateOrUpdatePokemonAsyncThunkF(action)) {
        // Since a pokemon has been created or updated, we need to 
        // redirect user to that pokemon's detail page and show toast.
        navigationService.navigate(`/pokemon/${action.payload.data}`);
        toast.success(action.payload.message, {
            duration: 4000,
            id: "createOrUpdate"
        });
    }
    if (isTrainerDeleteAsyncThunkF(action)) {
        // Since a trainer has been deleted, we need to reset 
        // the status so that a new api call is made and state is refreshed.
        store.dispatch(resetTrainerListStatus());
        // On delete, the user is redirected to the trainers page.
        navigationService.navigate("/trainers");
        // Show success notification for successful delete of
        // a trainer.
        // Since the api response does not return anything in this case,
        // we use a custom message.
        toast.success("Trainer has been deleted successfully.", {
            duration: 4000,
            id: "deleteToast"
        });
    }
    if (isPokemonDeleteAsyncThunkF(action)) {
        // Since a pokemon has been deleted, we need to reset 
        // the status so that a new api call and state is refreshed.
        store.dispatch(resetPokemonListStatus());
        // On delete, the user is redirected to the trainers page.
        navigationService.navigate("/pokemon");
        // Show success notification for successful delete of
        // a pokemon.
        // Since the api response does not return anything in this case,
        // we use a custom message.
        toast.success("Pokemon has been deleted successfully.", {
            duration: 4000,
            id: "deleteToast"
        });
    }
    
    return next(action);
}

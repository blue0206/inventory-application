import { Middleware } from "@reduxjs/toolkit";
import { 
    isCreateOrUpdateTrainerAsyncThunkF,
    isNotDeleteAsyncThunkF, 
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
    
    if (isNotDeleteAsyncThunkF(action)) {
        // Show success notification on successful actions.
        // The message are returned from the server and are
        // displayed as they are since they are already well crafted
        // for end-user.
        toast.success(action.payload.message, {
            duration: 2000
        });
    }
    if (isTrainerDeleteAsyncThunkF(action)) {
        // Show success notification for successful delete of
        // a trainer.
        // Since the api response does not return anything in this case,
        // we use a custom message.
        toast.success("Trainer has been deleted successfully.", {
            duration: 2000
        });
        // Since a trainer has been deleted, we need to reset 
        // the status so that a new api call and state is refreshed.
        store.dispatch(resetTrainerListStatus());
        // On delete, the user is redirected to the trainers page.
        navigationService.navigate("/trainers");
    }
    if (isPokemonDeleteAsyncThunkF(action)) {
        // Show success notification for successful delete of
        // a pokemon.
        // Since the api response does not return anything in this case,
        // we use a custom message.
        toast.success("Pokemon has been deleted successfully.", {
            duration: 2000
        });
        // Since a pokemon has been deleted, we need to reset 
        // the status so that a new api call and state is refreshed.
        store.dispatch(resetPokemonListStatus());
        // On delete, the user is redirected to the trainers page.
        navigationService.navigate("/pokemon");
    }
    if (isCreateOrUpdateTrainerAsyncThunkF(action)) {
        // Since a trainer has been created or updated, we need to 
        // redirect user that trainer's detail page.
        navigationService.navigate(`/trainers/${action.payload.data}`);
    }
    
    return next(action);
}
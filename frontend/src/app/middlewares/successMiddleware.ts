import { Middleware } from "@reduxjs/toolkit";
import { isNotDeleteAsyncThunkF, isPokemonDeleteAsyncThunkF, isTrainerDeleteAsyncThunkF } from "../reduxTypeGuard";
import { toast } from "sonner";

// Middleware for showing customized notifications when an action is successful
// and to handle any other side effects.
export const successMiddleware: Middleware = () => (next) => (action) => {
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
    }
    if (isPokemonDeleteAsyncThunkF(action)) {
        // Show success notification for successful delete of
        // a pokemon.
        // Since the api response does not return anything in this case,
        // we use a custom message.
        toast.success("Pokemon has been deleted successfully.", {
            duration: 2000
        });
    }
    
    return next(action);
}
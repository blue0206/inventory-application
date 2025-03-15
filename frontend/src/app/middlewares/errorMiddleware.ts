import { isRejected, Middleware } from "@reduxjs/toolkit"
import { isCustomDefinedError } from "@/utils/custom-error";
import { isApiErrorList } from "shared";
import { toast } from "sonner";
import { isCreateOrUpdatePokemonAsyncThunkR, isCreateOrUpdateTrainerAsyncThunkR } from "../reduxTypeGuard";
import { setError } from "../../features/error/errorSlice";
import { navigationService } from "../../utils/navigation";

// Middleware for centralized and standardized error handling across the application.
export const errorHandlingMiddleware: Middleware = (store) => (next) => (action) => {
    // Check if action is rejected, and payload is a custom defined error using type guard.
    if (isRejected(action) && isCustomDefinedError(action.payload)) {
        /**
         * Errors can either be CustomError or FetchError where 
         * CustomError represents API error response data from the server while 
         * FetchError represents network errors that occur during fetching of data. 
         * The codebase has been designed such that the error is centralized in this middleware
         * and the errors will ALWAYS be one of these two types. 
         * This way we don't have to handle errors in each reducer or components, or worry about
         * any unforeseen errors.
         * 
         * The switch statement will handle errors based on status codes (meaning CustomErrors) and
         * default case for undefined status code (meaning Fetch errors).
         * The idea here is to display an appropriate error message to the user depending on the status code.
         * The errors messages are displayed either via a toast or by navigating to the ErrorComponent.
         * Inside each switch case, the error handling will further be based on the action type.
         **/
        switch (action.payload.statusCode) {
            case 400:
                // Bad Request
                // Update error state and redirect to error route.
                store.dispatch(setError(action.payload));
                navigationService.navigate("/error");
                break;
            case 401:
                // Unauthorized Request
                if (isApiErrorList(action.payload.error)) {
                    toast.error(action.payload.error[0].message, {
                        duration: 11000,
                        cancel: {
                            label: "Dismiss",
                            onClick: () => {}
                        }
                    });
                }
                break;
            case 404:
            break;
            case 409:
                // Conflict Error
                // This error is not inherently a Custom API response. It is instead thrown by Prisma and hence
                // has a different response format. Check out `error-lookup` markdown file for more details.
                // We provide proper field and message here for proper display within error components.
                if (isCreateOrUpdateTrainerAsyncThunkR(action)) {
                    const newMessage = "A trainer with this name already exists. Please choose a different name.";
                    store.dispatch(setError({...action.payload, error: [{ message: newMessage, field: "trainerName" }]}));
                } else if (isCreateOrUpdatePokemonAsyncThunkR(action)) {
                    const newMessage = "This Pokémon already exists.";
                    store.dispatch(setError({...action.payload, error: [{ message: newMessage, field: "pokemonName" }]}));
                }
                break;
            case 422:
                // Validation Error
                // Update error state to display validation errors.
                store.dispatch(setError(action.payload));
                break;
            case 500:
            break;
            default: // For Fetch errors encountered on failed API calls.
        }
    }

    return next(action);
}
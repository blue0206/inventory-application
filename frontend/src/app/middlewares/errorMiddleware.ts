import { isRejected, Middleware } from "@reduxjs/toolkit"
import { isCustomDefinedError } from "@/utils/custom-error";
import { isApiErrorList } from "shared";
import { toast } from "sonner";
import { isCreateOrUpdatePokemonAsyncThunkR, isCreateOrUpdateTrainerAsyncThunkR } from "../reduxTypeGuard";

// Middleware for centralized and standardized error handling across the application.
export const errorHandlingMiddleware: Middleware = () => (next) => (action) => {
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
                if (isCreateOrUpdateTrainerAsyncThunkR(action)) {
                    toast.error("A trainer with this name already exists. Please choose a different name.", {
                        duration: 11000,
                        cancel: {
                            label: "Dismiss",
                            onClick: () => {}
                        }
                    });
                } else if (isCreateOrUpdatePokemonAsyncThunkR(action)) {
                    toast.error("This Pokémon already exists.", {
                        duration: 11000,
                        cancel: {
                            label: "Dismiss",
                            onClick: () => {}
                        }
                    });
                }
            break;
            case 422:
            break;
            case 500:
            break;
            default: // For Fetch errors encountered on failed API calls.
        }
    }

    return next(action);
}
import { isFulfilled, Middleware } from "@reduxjs/toolkit";
import { toast } from "sonner";

// Middleware for showing customized notifications when an action is successful
// and to handle any other side effects.
export const successMiddleware: Middleware = () => (next) => (action) => {
    // Check if action is fulfilled.
    if (isFulfilled(action)) {
        /**
         * The purpose of this middleware is to show a notification on success based
         * on the action type (via switch statement).
         * Another purpose is to handle any side effects that need to happen after an
         * action has been completed like redirection, other component state updates, etc.
         */
        switch (action.type) {
            // Action fetching all trainers.
            case "trainer/fetchTrainers/fulfilled":
                // Display a success notification.
                toast.success("Fetched all trainers successfully!", {
                    duration: 3500
                });
                break;
            default:
                
        }
    }
    return next(action);
}
import { ReactElement, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { fetchTrainersList, resetStatus } from "@/features/trainer/trainerSlice";

export default function TrainersList(): ReactElement {
    const dispatch = useAppDispatch();
    const status = useAppSelector(state => state.trainer.status);
    
    // TODO: Reset status to 'idle' when create/update route is
    // implemented to re-fetch new and updated data.
    useEffect(() => {
        // Fetch trainers if status is 'idle'
        if (status === 'idle') {
            dispatch(fetchTrainersList());
        }
        // Cleanup function. Resets status to 'idle'
        // if fetch fails, to try again.
        return () => {
            if (status === 'failed') {
                dispatch(resetStatus());
            }
        }
    }, [dispatch, status]);

    return (
        <></>
    );
}
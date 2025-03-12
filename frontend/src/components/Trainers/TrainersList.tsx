import { ReactElement, useEffect } from "react";
import { Header } from "..";
import TrainerCard from "./TrainerCard";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { fetchTrainersList, getTrainersList, getStatus, resetStatus } from "@/features/trainer/trainerSlice";

export default function TrainersList(): ReactElement {
    const dispatch = useAppDispatch();
    const trainers = useAppSelector(getTrainersList);
    const status = useAppSelector(getStatus);
    
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
        <div className="flex flex-col gap-5 h-full w-full">
            <Header />
            <div className="grid grid-cols-1 px-5 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {
                    trainers.length > 0 ? (
                        trainers.map(trainer => {
                            return (
                                <TrainerCard 
                                    key={trainer.id} 
                                    id={trainer.id} 
                                    name={trainer.name} 
                                    image={trainer.imageLink}
                                />
                            )
                        })
                    ) : (null)
                }
            </div>
        </div>
    );
}

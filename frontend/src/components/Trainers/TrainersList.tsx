import { ReactElement, useEffect } from "react";
import { Header } from "..";
import TrainerCard from "./TrainerCard";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { fetchTrainersList, getTrainersList, getStatus, resetStatus } from "@/features/trainer/trainerSlice";
import SkeletonCard from "../Skeleton/SkeletonCard";

export default function TrainersList(): ReactElement {
    const dispatch = useAppDispatch();
    const trainers = useAppSelector(getTrainersList);
    const status = useAppSelector(getStatus);
    // Array used in skeleton loading animation
    const arr = [1, 2, 3, 4, 5, 6, 7, 8];
    
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
        <div className="flex flex-col gap-5 h-full w-full mb-11">
            <Header />
            <div className="grid grid-cols-1 px-5 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {
                    status === "loading" ? (
                        arr.map(iter => {
                            return (<SkeletonCard key={iter}/>)
                        })
                    ) : (
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
                    )
                }
            </div>
        </div>
    );
}

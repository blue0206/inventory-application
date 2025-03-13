import { ReactElement, useEffect, useState } from "react";
import { Header } from "..";
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbItem,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { navigationService } from "../../utils/navigation";
import { useAppDispatch } from "../../app/hooks";
import { fetchTrainer } from "@/features/data/dataSlice";
import { TrainerWithRelation } from "shared";
import { useParams } from "react-router";

export default function Trainer(): ReactElement {
    const dispatch = useAppDispatch();
    const { trainerId } = useParams();
    const [data, setData] = useState<TrainerWithRelation>({
        id: Number(trainerId),
        name: "",
        imageLink: null,
        pokemon: []
    });

    /**
     * Fetches trainer data when component mounts and whenever the trainer ID changes.
     * The data is stored in local component state instead of Redux state since it
     * is not required in any other components and the amount of data is small enough
     * to ignore memoization. 
     * 
     * The data is fetched via thunks in order to utilize centralized error and 
     * notification management via redux middlewares.
     * This prevents the logic from being duplicated across multiple components.
     * 
     * 
     */
    useEffect(() => {
        // IIFE triggered upon mount or ID change.
        ;(async function fetchData() {
            const action = await dispatch(fetchTrainer(Number(trainerId)));
            if (fetchTrainer.fulfilled.match(action)) {
                setData(action.payload);
            }
        }());
    }, [dispatch, trainerId]);

    return (
        <div className="flex flex-col gap-2.5 h-full w-full">
            <Header />
            <div className="px-8">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink className="cursor-pointer" onClick={() => navigationService.navigate("/")}>Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink className="cursor-pointer" onClick={() => navigationService.navigate("/trainers")}>Trainers</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{data.name}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div>

            </div>
        </div>
    );
}
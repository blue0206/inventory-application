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

    useEffect(() => {
        ;(async function fetchData() {
            console.log("ID", trainerId);
            const action = await dispatch(fetchTrainer(Number(trainerId)));
            if (fetchTrainer.fulfilled.match(action)) {
                console.log("Fetched trainer data:", action.payload);
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
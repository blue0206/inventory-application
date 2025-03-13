import { ReactElement, useState } from "react";
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
import { TrainerWithRelation } from "shared";

// If trainer is to be created, no need for other props.
// Else, other props are required for making api call and to populate form.
type TrainerFormProps = {
    update: false;
} & Partial<TrainerWithRelation> | {
    update: true;
} & Required<TrainerWithRelation>;

export default function TrainerForm({
    update = false,
    ...trainer
}: TrainerFormProps): ReactElement {
    // Create form data state to keep track of form data.
    // The type is supposed to be the same as provided by api, except the id.
    const [formData, setFormData] = useState<Omit<TrainerWithRelation, "id">>({
        name: trainer.name || "",
        imageLink: trainer.imageLink || null,
        pokemon: trainer.pokemon || []
    });

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
                            <BreadcrumbPage>{update ? ('Update Trainer') : ('Create Trainer')}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div>

            </div>
        </div>
    );
}

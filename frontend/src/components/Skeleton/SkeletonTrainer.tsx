import { ReactElement } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "../ui/skeleton";
import SkeletonCard from "./SkeletonCard";

export default function SkeletonTrainer(): ReactElement {
    // Array to display card skeletons.
    const arr = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <div className="grow flex flex-col max-w-4xl mx-auto">
            <AspectRatio ratio={16/9} className="rounded-lg mb-6">
                <Skeleton className="w-full h-full rounded-lg" />
            </AspectRatio>
            <Skeleton className="scroll-m-20 h-13 w-1/2 self-center mb-8 tracking-tight rounded-md" />
            <div className="flex justify-center gap-5 mb-4">
                <Skeleton className="h-9 px-4 py-2 has-[>svg]:px-3 w-[8ch]" />
                <Skeleton className="h-9 px-4 py-2 has-[>svg]:px-3 w-[8ch]" />
            </div>
            <Skeleton className="scroll-m-20 h-11 w-[25ch] self-center pb-2 tracking-tight mt-4 text-center mb-4" />
            <div className="grid grid-cols-1 px-5 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {
                    arr.map(iter => {
                        return (
                            <SkeletonCard key={iter} />
                        )
                    })
                }
            </div>
        </div>
    )
}
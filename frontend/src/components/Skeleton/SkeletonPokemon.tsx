import { ReactElement } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "../ui/skeleton";

export default function SkeletonPokemon(): ReactElement {
    return (
        <div className="grow flex flex-col max-w-4xl mx-auto">
            <Skeleton className="scroll-m-20 h-13 w-1/2 self-center tracking-tight rounded-md mb-8" />
            <div className="w-max self-center flex flex-col justify-center items-center">
                <div className="flex justify-center gap-5">
                    <Skeleton className="h-9 px-4 py-2 has-[>svg]:px-3 w-[8ch]" />
                    <Skeleton className="h-9 px-4 py-2 has-[>svg]:px-3 w-[8ch]" />
                </div>
            </div>
            <Skeleton className="h-2 w-[25ch] rounded-md self-center my-2" />
            <div className="flex justify-center gap-5 mb-8">
                <Skeleton className="h-9 px-4 py-2 has-[>svg]:px-3 w-[8ch]" />
                <Skeleton className="h-9 px-4 py-2 has-[>svg]:px-3 w-[8ch]" />
            </div>
            <AspectRatio ratio={16/9} className="rounded-lg mb-6">
                <Skeleton className="h-full w-full rounded-lg" />
            </AspectRatio>
        </div>
    )
}
import { ReactElement } from "react";
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "../ui/skeleton";

export default function SkeletonCard(): ReactElement {
    return (
        <>
            <Card className=' shadow-md '>
                <CardHeader>
                    <AspectRatio ratio={1} className='rounded-t-lg'>
                        <Skeleton className="w-full h-full" />
                    </AspectRatio>
                </CardHeader>
                <CardContent className="flex justify-center">
                    <Skeleton className="w-32 h-5 rounded-md" />
                </CardContent>
                <CardFooter className="flex justify-center items-center gap-x-6">
                    <Skeleton className="h-9 px-4 py-2 has-[>svg]:px-3 w-[8ch]" />
                    <Skeleton className="h-9 px-4 py-2 has-[>svg]:px-3 w-[8.5ch]" />
                </CardFooter>
            </Card>
        </>
    )
}
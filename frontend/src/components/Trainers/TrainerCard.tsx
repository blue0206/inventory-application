import { ReactElement } from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
    CardTitle
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import RedAvatar from "../../assets/red-avatar.png";

type TrainerCardProps = {
    id: string | number;
    name: string;
    image: string | null;
}

export default function TrainerCard({
    id,
    name,
    image
}: TrainerCardProps): ReactElement {

    return (
        <Card>
            <CardHeader>
                <AspectRatio ratio={1.25/1}>
                    <Avatar className='w-full h-full'>
                        <AvatarImage className='h-full w-full object-scale-down' src={image ? image : ""} />
                        <AvatarFallback>
                            <Avatar className='w-full h-full'>
                                <AvatarImage src={RedAvatar} className='h-full w-full object-contain bg-background'></AvatarImage>
                            </Avatar>
                        </AvatarFallback>
                    </Avatar>
                </AspectRatio>
            </CardHeader>
            <CardContent>
                <CardTitle>{name}</CardTitle>
            </CardContent>
            <CardFooter>
                <Button variant={"ghost"} className='cursor-pointer'>Update</Button>
                <Button variant={"destructive"} className='cursor-pointer'>Delete</Button>
            </CardFooter>
        </Card>
    );
}

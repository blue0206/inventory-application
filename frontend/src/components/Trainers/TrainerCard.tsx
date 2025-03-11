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
    image?: string;
}

export default function TrainerCard({
    id,
    name,
    image
}: TrainerCardProps): ReactElement {

    return (
        <Card>
            <CardHeader>
                <AspectRatio ratio={16/9} className='rounded-lg'>
                    <Avatar className='w-full h-full'>
                        <AvatarImage src={image} />
                        <AvatarFallback>
                            <img src={RedAvatar} alt="Trainer Image" />
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

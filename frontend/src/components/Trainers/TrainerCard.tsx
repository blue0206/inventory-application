import { ReactElement } from 'react';
import { navigationService } from '../../utils/navigation';
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

    const handleOpen = () => {
        navigationService.navigate(`/trainers/${id}/`);
    }

    return (
        <Card className=' shadow-md hover:scale-105'>
            <CardHeader className='cursor-pointer'>
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
            <CardContent className='cursor-pointer'>
                <CardTitle className='text-center text-lg'>{name}</CardTitle>
            </CardContent>
            <CardFooter className='flex flex-row gap-5 justify-center items-center'>
                <Button variant={"link"} onClick={handleOpen} className='cursor-pointer hover:bg-accent'>Open</Button>
                <Button variant={"destructive"} className='cursor-pointer'>Delete</Button>
            </CardFooter>
        </Card>
    );
}

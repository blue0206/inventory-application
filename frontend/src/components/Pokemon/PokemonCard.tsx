import { ReactElement, useState } from 'react';
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import MissingnoAvatar from "../../assets/missingno-avatar.png";
import { useAppDispatch } from '@/app/hooks';
import { deletePokemon } from '@/features/data/dataSlice';

type PokemonCardProps = {
    id: string | number;
    name: string;
    image: string | null;
}

export default function PokemonCard({
    id,
    name,
    image
}: PokemonCardProps): ReactElement {
    const dispatch = useAppDispatch();
    const [secretKey, setSecretKey] = useState<string>("");

    const handleDelete = async () => {
        await dispatch(deletePokemon({ id, secretKey }));
    }
    
    const handleOpen = () => {
        navigationService.navigate(`/pokemon/${id}/`);
    }

    return (
        <Card className=' shadow-md hover:scale-105'>
            <CardHeader>
                <AspectRatio ratio={1.25/1}>
                    <Avatar className='w-full h-full'>
                        <AvatarImage className='h-full w-full object-contain' src={image ? image : ""} />
                        <AvatarFallback>
                            <Avatar className='w-full h-full'>
                                <AvatarImage src={MissingnoAvatar} className='h-full w-full object-contain bg-background'></AvatarImage>
                            </Avatar>
                        </AvatarFallback>
                    </Avatar>
                </AspectRatio>
            </CardHeader>
            <CardContent>
                <CardTitle className='text-center text-lg'>{name}</CardTitle>
            </CardContent>
            <CardFooter className='flex flex-row gap-5 justify-center items-center'>
                <Button variant={"link"} onClick={handleOpen} className='cursor-pointer border-accent border-2 hover:bg-accent'>Open</Button>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant={"destructive"} className='cursor-pointer'>Delete</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] gap-0 px-4 py-4">
                        <DialogHeader>
                            <DialogTitle className='text-lg'>Are you absolutely sure?</DialogTitle>
                            <DialogDescription className='mb-3.5'>
                                This action cannot be undone. This will permanently delete the entry 
                                and remove the data from the server.
                            </DialogDescription>
                        </DialogHeader>
                        <div className='flex flex-col gap-0.5 mb-1'>
                            <p className='text-sm font-medium mb-1.5'>Enter secret key to proceed:</p>
                            <Input type={'password'} value={secretKey} onChange={(e) => setSecretKey(e.target.value)} />
                            <div className='text-xs'>(Hint: Kazuma's sword)</div>
                        </div>
                        <DialogFooter>
                            <Button variant={'destructive'} onClick={handleDelete} className='cursor-pointer'>Delete</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
    );
}

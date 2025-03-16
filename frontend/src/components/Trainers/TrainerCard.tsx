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
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerTitle
} from "@/components/ui/drawer";
import { useMediaQuery } from "@custom-react-hooks/use-media-query";
import { Input } from "@/components/ui/input";
import RedAvatar from "../../assets/red-avatar.png";
import { deleteTrainer } from '../../features/data/dataSlice';
import { useAppDispatch } from '../../app/hooks';

type TrainerCardProps = {
    id: number;
    name: string;
    image: string | null;
}

export default function TrainerCard({
    id,
    name,
    image
}: TrainerCardProps): ReactElement {
    const dispatch = useAppDispatch();
    const [secretKey, setSecretKey] = useState<string>("");
    // Check if screen is desktop. This will be used to render
    // dialog for delete modal on desktop and drawer on mobile.
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const handleDelete = async () => {
        const deleteAction = await dispatch(deleteTrainer({ 
            id,
            data: {
                secretKey
            }
        }));
        // Reset secret key if invalid.
        if (deleteTrainer.rejected.match(deleteAction)) {
            setSecretKey("");
        }
    }
    
    const handleOpen = () => {
        navigationService.navigate(`/trainers/${id}`);
    }

    return (
        <Card className=' shadow-md hover:scale-105'>
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
                <CardTitle className='text-center text-lg'>{name}</CardTitle>
            </CardContent>
            <CardFooter className='flex flex-row gap-5 justify-center items-center'>
                <Button variant={"link"} onClick={handleOpen} className='cursor-pointer border-accent border-2 hover:bg-accent'>Open</Button>
                {
                    isDesktop ? (
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant={"destructive"} className='cursor-pointer'>Delete</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] gap-0 px-4 py-4">
                                <DialogHeader>
                                    <DialogTitle className='text-lg'>Are you absolutely sure?</DialogTitle>
                                    <DialogDescription className='mb-3.5'>
                                        This action cannot be undone. This will permanently delete the trainer 
                                        and remove the data from the server.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className='flex flex-col gap-0.5 mb-1'>
                                    <p className='text-sm font-medium mb-1.5'>Enter secret key to proceed:</p>
                                    <Input type={'password'} value={secretKey} onChange={(e) => setSecretKey(e.target.value)}/>
                                    <div className='text-xs'>(Hint: Kazuma's sword)</div>
                                </div>
                                <DialogFooter>
                                    <Button variant={'destructive'} onClick={handleDelete} className='cursor-pointer'>Delete</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    ) : (
                        <Drawer>
                            <DrawerTrigger asChild>
                                <Button variant={"destructive"} className='cursor-pointer'>Delete</Button>
                            </DrawerTrigger>
                            <DrawerContent className='px-3.5 py-4'>
                                <div className='mx-auto w-full max-w-sm'>
                                    <DrawerHeader>
                                        <DrawerTitle className='text-lg'>Are you absolutely sure?</DrawerTitle>
                                        <DialogDescription className='mb-3.5'>
                                            This action cannot be undone. This will permanently delete the trainer
                                            and remove the data from the server.
                                        </DialogDescription>
                                    </DrawerHeader>
                                    <div className='flex flex-col gap-0.5 mb-1'>
                                        <p className='text-sm font-medium mb-1.5'>Enter secret key to proceed:</p>
                                        <Input type={'password'} value={secretKey} onChange={(e) => setSecretKey(e.target.value)} />
                                        <div className='text-xs'>(Hint: Kazuma's sword)</div>
                                    </div>
                                    <DialogFooter>
                                        <Button variant={'destructive'} onClick={handleDelete} className='cursor-pointer'>Delete</Button>
                                    </DialogFooter>
                                </div>
                            </DrawerContent>
                        </Drawer>
                    )
                }
            </CardFooter>
        </Card>
    );
}

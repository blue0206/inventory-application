import { ReactElement, useEffect, useState } from "react";
import { Header, PokemonCard } from "..";
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbItem,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import RedAvatar from "../../assets/red-avatar.png";
import { navigationService } from "../../utils/navigation";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteTrainer, fetchTrainer, getTrainerLoadingStatus } from "../../features/data/dataSlice";
import { TrainerWithRelation } from "shared";
import { useParams } from "react-router";
import { useMediaQuery } from "@custom-react-hooks/use-media-query";
import SkeletonTrainer from "../Skeleton/SkeletonTrainer";
import { Skeleton } from "../ui/skeleton";

export default function Trainer(): ReactElement {
    const dispatch = useAppDispatch();
    const { trainerId } = useParams();
    const [data, setData] = useState<TrainerWithRelation>({
        id: Number(trainerId),
        name: "",
        imageLink: null,
        pokemon: []
    });
    // Get trainer loading status from redux store.
    const trainerLoading = useAppSelector(getTrainerLoadingStatus);
    // Secret key for delete.
    const [secretKey, setSecretKey] = useState<string>("");
    // Check if screen is desktop. This will be used to render
    // dialog for delete modal on desktop and drawer on mobile.
    const isDesktop = useMediaQuery("(min-width: 768px)");

    // Update button handler method.
    const handleUpdate = () => {
        navigationService.navigate("/trainer-form", {
            state: {
                ...data
            }
        });
    }

    // Delete button handler method.
    const handleDelete = async () => {
        const deleteAction = await dispatch(deleteTrainer({
            id: data.id,
            data: {
                secretKey
            }
        }));
        // Reset secretKey if invalid.
        if (deleteTrainer.rejected.match(deleteAction)) {
            setSecretKey("");
        }
    }

    /**
     * Fetches trainer data when component mounts and whenever the trainer ID changes.
     * The data is stored in local component state instead of Redux state since it
     * is not required in any other components and the amount of data is small enough
     * to ignore memoization. 
     * 
     * The data is fetched via thunks in order to utilize centralized error and 
     * notification management via redux middlewares.
     * This prevents the logic from being duplicated across multiple components.
     * 
     * 
     */
    useEffect(() => {
        // IIFE triggered upon mount or ID change.
        ;(async function fetchData() {
            const action = await dispatch(fetchTrainer(Number(trainerId)));
            if (fetchTrainer.fulfilled.match(action)) {
                setData(action.payload.data);
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
                            <BreadcrumbPage>
                                {
                                    trainerLoading ? (
                                        <Skeleton className="w-24 h-5 rounded-md" />
                                    ) : (
                                        data.name
                                    )
                                }
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="container mx-auto p-4">
                {
                    trainerLoading ? (
                        <SkeletonTrainer />
                    ) : (
                        <div className="grow flex flex-col max-w-4xl mx-auto">
                            <AspectRatio ratio={16/9} className="bg-muted rounded-lg mb-6">
                                <Avatar className="h-full w-full rounded-lg">
                                    <AvatarImage src={data.imageLink ? data.imageLink : RedAvatar} alt="Trainer Image" className="object-contain" />
                                    <AvatarFallback>
                                        <img src={RedAvatar} alt="Trainer Image" className="object-contain brightness-105 contrast-110" />
                                    </AvatarFallback>
                                </Avatar>
                            </AspectRatio>
                            <h1 className="scroll-m-20 text-4xl text-center mb-8 font-extrabold tracking-tight lg:text-5xl">{data.name}</h1>
                            <div className="flex justify-center gap-5 mb-4">
                                <Button variant={'link'} onClick={handleUpdate} className="hover:bg-accent cursor-pointer border-2 border-accent">Update</Button>
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
                            </div>
                            <h2 className="scroll-m-20 w-32 self-center border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center mb-4">Pokémon</h2>
                            {
                                data.pokemon.length > 0 ? (
                                    <div className="grid grid-cols-1 px-5 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                                        {
                                            data.pokemon.length > 0 && data.pokemon.map((pokemon) => {
                                                return (
                                                    <PokemonCard 
                                                        key={pokemon.id} 
                                                        id={pokemon.id} 
                                                        name={pokemon.name} 
                                                        image={pokemon.imageLink}
                                                    />
                                                )
                                            })
                                        }
                                    </div>

                                ) : (
                                    <div className="text-lg text-center w-full italic">This trainer doesn't own any Pokémon.</div>
                                )
                            }
                        </div>
                    )
                }
            </div>
        </div>
    );
}

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
import { useAppDispatch } from "../../app/hooks";
import { fetchTrainer } from "@/features/data/dataSlice";
import { TrainerWithRelation } from "shared";
import { useParams } from "react-router";
import { useMediaQuery } from "@custom-react-hooks/use-media-query";

export default function Trainer(): ReactElement {
    const dispatch = useAppDispatch();
    const { trainerId } = useParams();
    const [data, setData] = useState<TrainerWithRelation>({
        id: Number(trainerId),
        name: "",
        imageLink: null,
        pokemon: []
    });
    // Secret key for delete.
    const [secretKey, setSecretKey] = useState<string>("");
    // Check if screen is desktop. This will be used to render
    // dialog for delete modal on desktop and drawer on mobile.
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const handleDelete = () => {
        
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
                            <BreadcrumbPage>{data.name}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="grow flex flex-col">
                <AspectRatio ratio={2/1} className="flex justify-center py-4 px-5 mb-4">
                    <img src={data.imageLink ? data.imageLink : RedAvatar} className="mx-auto" />
                </AspectRatio>
                <h1 className="scroll-m-20 text-4xl text-center mb-8 font-extrabold tracking-tight lg:text-5xl">{data.name}</h1>
                <div className="flex justify-center gap-5 mb-4">
                    <Button variant={'link'} className="hover:bg-accent cursor-pointer border-2 border-accent">Update</Button>
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
                <div className="grid grid-cols-1 px-5 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {
                        data.pokemon.length > 0 ? data.pokemon.map((pokemon) => {
                            return (
                                <PokemonCard 
                                    key={pokemon.id} 
                                    id={pokemon.id} 
                                    name={pokemon.name} 
                                    image={pokemon.imageLink}
                                />
                            )
                        }) : (
                            <div className="text-lg italic">This trainer doesn't own any Pokémon.</div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

import { ReactElement, useEffect, useState } from "react";
import { Header } from "..";
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
import MissingnoAvatar from "../../assets/missingno-avatar.png";
import { navigationService } from "../../utils/navigation";
import { useAppDispatch } from "../../app/hooks";
import { fetchPokemon } from "@/features/data/dataSlice";
import { Pokemon as PokemonType } from "shared";
import { useParams } from "react-router";
import { useMediaQuery } from "@custom-react-hooks/use-media-query";

export default function Pokemon(): ReactElement {
    const dispatch = useAppDispatch();
    const { pokemonId } = useParams();
    const [data, setData] = useState<PokemonType>({
        id: Number(pokemonId),
        name: "",
        imageLink: null,
        types: []
    });
    // Secret key for delete.
    const [secretKey, setSecretKey] = useState<string>("");
    // Check if screen is desktop. This will be used to render
    // dialog for delete modal on desktop and drawer on mobile.
    const isDesktop = useMediaQuery("(min-width: 768px)");

    // Update button handler method.
    const handleUpdate = () => {
        navigationService.navigate("/pokemon-form", {
            state: {
                ...data
            }
        });
    }

    const handleDelete = () => {

    }

    /**
     * Fetches pokemon data when component mounts and whenever the pokemon ID changes.
     * The data is stored in local component state instead of Redux state since it
     * is not required in any other components and the amount of data is small enough
     * to ignore memoization.
     * 
     * The data is fetched via thunks in order to utilize centralized error and 
     * notification management via redux middlewares.
     * This prevents the logic from being duplicated across multiple components.
     */
    useEffect(() => {
        // IIFE triggered upon mount or ID change.
        ;(async function fetchData() {
            const action = await dispatch(fetchPokemon(Number(pokemonId)));
            if (fetchPokemon.fulfilled.match(action)) {
                setData(action.payload.data);
            }
        }());
    }, [dispatch, pokemonId]);

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
                            <BreadcrumbLink className="cursor-pointer" onClick={() => navigationService.navigate("/pokemon")}>Pokémon</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{data.name}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="grow flex flex-col">
                <h1 className="scroll-m-20 text-4xl text-center mb-8 font-extrabold tracking-tight lg:text-5xl">{data.name}</h1>
                <div className="w-max self-center flex flex-col justify-center items-center">
                    <h2 className="scroll-m-20 border-b self-center pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center mb-4">
                        {
                            data.types.length === 2 ? (
                                <>
                                    <Button variant={"secondary"} className="bg-accent mr-3.5">{data.types[0]}</Button>
                                    <Button variant={"default"}>{data.types[1]}</Button>
                                </>
                            ) : (
                                <>
                                    <Button variant={"secondary"}>{data.types[0]}</Button>
                                </>
                            )
                        }
                    </h2>
                </div>
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
                                            This action cannot be undone. This will permanently delete the pokemon 
                                            and remove the data from the server as well as from the trainers who own 
                                            this pokemon.
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
                                                This action cannot be undone. This will permanently delete the pokemon 
                                                and remove the it from the server as well as from the trainers who own 
                                                this pokemon.
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
                <AspectRatio ratio={2/1} className="flex justify-center py-4 px-5 mb-4">
                    <img 
                        src={data.imageLink ? data.imageLink : MissingnoAvatar} 
                        onError={(e) => e.currentTarget.src = MissingnoAvatar} 
                        alt="Pokémon Image" 
                        className="mx-auto" 
                    />
                </AspectRatio>
            </div>
        </div>
    );
}

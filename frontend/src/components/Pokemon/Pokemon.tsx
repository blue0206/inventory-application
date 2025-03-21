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
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar";
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerTitle
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import MissingnoAvatar from "../../assets/missingno-avatar.png";
import { navigationService } from "../../utils/navigation";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deletePokemon, fetchPokemon, getPokemonLoadingStatus } from "../../features/data/dataSlice";
import { Pokemon as PokemonType, PokeType } from "shared";
import { useParams } from "react-router";
import { useMediaQuery } from "@custom-react-hooks/use-media-query";
import { Skeleton } from "../ui/skeleton";
import SkeletonPokemon from "../Skeleton/SkeletonPokemon";
import { getTypeColor } from "../../utils/getPokemonTypeColor";


export default function Pokemon(): ReactElement {
    const dispatch = useAppDispatch();
    const { pokemonId } = useParams();
    const [data, setData] = useState<PokemonType>({
        id: Number(pokemonId),
        name: "",
        imageLink: null,
        types: []
    });
    // Get Pokemon loading status from Redux store.
    const pokemonLoading = useAppSelector(getPokemonLoadingStatus);
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

    // Delete button handler method.
    const handleDelete = async () => {
        const deleteAction = await dispatch(deletePokemon({
            id: data.id,
            data: {
                secretKey
            }
        }));
        // Reset secretKey if invalid.
        if (deletePokemon.rejected.match(deleteAction)) {
            setSecretKey("");
        }
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
                            <BreadcrumbPage>
                                {
                                    pokemonLoading ? (
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
                    pokemonLoading ? (
                        <SkeletonPokemon />
                    ) : (
                        <div className="grow flex flex-col max-w-4xl mx-auto">
                            <h1 className="scroll-m-20 text-4xl text-center mb-8 font-extrabold tracking-tight lg:text-5xl">{data.name}</h1>
                            <div className="w-max self-center flex flex-col justify-center items-center">
                                <div className="flex justify-between items-center gap-0">
                                    {
                                        data.types.length === 2 ? (
                                            <>
                                                <Button 
                                                    variant={"pokeType"} 
                                                    className={`${getTypeColor(data.types[0] as PokeType).bg} ${getTypeColor(data.types[0] as PokeType).fg} mr-3.5`}
                                                >
                                                    {data.types[0]}
                                                </Button>
                                                <Button 
                                                    variant={"pokeType"} 
                                                    className={`${getTypeColor(data.types[1] as PokeType).bg} ${getTypeColor(data.types[1] as PokeType).fg}`}
                                                >
                                                    {data.types[1]}
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button 
                                                    variant={"pokeType"} 
                                                    className={`${getTypeColor(data.types[0] as PokeType).bg} ${getTypeColor(data.types[0] as PokeType).fg}`}
                                                >
                                                    {data.types[0]}
                                                </Button>
                                            </>
                                        )
                                    }
                                </div>
                                <Separator className="my-2" />
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
                            <AspectRatio ratio={16/9} className="bg-muted rounded-lg mb-6">
                                <Avatar className="h-full w-full rounded-lg">
                                    <AvatarImage src={data.imageLink ? data.imageLink : MissingnoAvatar} loading="eager" alt="Pokémon Image" className="object-contain" />
                                    <AvatarFallback>
                                        <img src={MissingnoAvatar} loading="lazy" alt="Pokémon Image" className="object-contain brightness-105 contrast-110" />
                                    </AvatarFallback>
                                </Avatar>
                            </AspectRatio>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

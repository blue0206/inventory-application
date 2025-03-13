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
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import MissingnoAvatar from "../../assets/missingno-avatar.png";
import { navigationService } from "../../utils/navigation";
import { useAppDispatch } from "../../app/hooks";
import { fetchPokemon } from "@/features/data/dataSlice";
import { Pokemon as PokemonType } from "shared";
import { useParams } from "react-router";

export default function Pokemon(): ReactElement {
    const dispatch = useAppDispatch();
    const { pokemonId } = useParams();
    const [data, setData] = useState<PokemonType>({
        id: Number(pokemonId),
        name: "",
        imageLink: null,
        types: []
    });

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
                setData(action.payload);
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
                                    <Button variant={"outline"}>{data.types[0]}</Button>
                                </>
                            )
                        }
                    </h2>
                </div>
                <div className="flex justify-center py-4 px-5 mb-4">
                    <AspectRatio ratio={1.8/1} className="flex justify-center h-full w-full">
                        <img src={data.imageLink ? data.imageLink : MissingnoAvatar} className="mx-auto" />
                    </AspectRatio>
                </div>
            </div>
        </div>
    );
}

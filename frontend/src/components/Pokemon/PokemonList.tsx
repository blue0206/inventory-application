import { ReactElement, useEffect } from "react";
import { Header } from "..";
import PokemonCard from "./PokemonCard";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { fetchPokemonList, getPokemonList, getStatus, resetStatus } from "@/features/pokemon/pokemonSlice";
import SkeletonCard from "../Skeleton/SkeletonCard";

export default function PokemonList(): ReactElement {
    const dispatch = useAppDispatch();
    const pokemon = useAppSelector(getPokemonList);
    const status = useAppSelector(getStatus);
    // Array used in skeleton loading animation
    const arr = [1, 2, 3, 4, 5, 6, 7, 8];

    useEffect(() => {
        // Fetch pokemon if status is 'idle'
        if (status === 'idle') {
            dispatch(fetchPokemonList());
        }
        // Cleanup function. Resets status to 'idle'
        // if fetch fails, to try again.
        return () => {
            if (status === 'failed') {
                dispatch(resetStatus());
            }
        }
    }, [dispatch, status]);

    return (
        <div className="flex flex-col gap-5 h-full w-full mb-11">
            <Header />
            <div className="grid grid-cols-1 px-5 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {
                    status === "loading" ? (
                        arr.map(iter => {
                            return (
                                <SkeletonCard key={iter} />
                            )
                        })
                    ) : (

                        pokemon.length > 0 ? (
                            pokemon.map(poke => {
                                return (
                                    <PokemonCard 
                                        key={poke.id} 
                                        id={poke.id} 
                                        name={poke.name} 
                                        image={poke.imageLink}
                                    />
                                )
                            })
                        ) : (null)
                    )
                }
            </div>
        </div>
    );
}

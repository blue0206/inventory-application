import { ReactElement, useEffect, useState } from "react";
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
        <></>
    );
}

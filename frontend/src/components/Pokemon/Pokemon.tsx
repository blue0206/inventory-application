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

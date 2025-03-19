import React, { ReactElement, useEffect, useState } from "react";
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
    Card,
    CardHeader, 
    CardContent, 
    CardTitle
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { navigationService } from "../../utils/navigation";
import { checkTypeDuplicate, isApiErrorList, Pokemon, PokemonRequestBody, PokemonTypeEnum, PokeType } from "shared";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getError } from "../../features/error/errorSlice";
import { useLocation } from "react-router";
import { createPokemon, updatePokemon } from "@/features/form/formThunks";

function sanitizeTypeField(types: [PokeType, PokeType?]): [PokeType, PokeType?] {
    const [type1, type2] = types;
    if (type1 && type2) return types;
    if (!type1 && type2) return [type2];
    // Type 1 is always present. It can never be undefined.
    return [type1];
}

export default function PokemonForm(): ReactElement {
    // Get state from useLocation hook.
    const state = useLocation()?.state;
    // Initialize update flag and trainer object.
    // Default is false for update since in default case
    // the form is in create mode.
    // The trainer object is initialized with undefined values
    // for the same reason.
    let update = false;
    let pokemon: Partial<Pokemon> = {
        id: undefined,
        name: "",
        imageLink: "",
        types: []
    };
    // Check if there is any state passed via react router.
    if (state) {
        // Set update flag to true and initialize trainer object with 
        // provided state.
        const { ...tempPokemon }: Pokemon = state;
        pokemon = tempPokemon;
        update = true;
    }
    // Create a variable with same type as pokemonTypes in PokemonRequestBody.
    // This is to prevent type clash with Pokemon type passed in as location state.
    let PokemonType: [PokeType, PokeType?];
    if (pokemon?.types?.length === 1) {
        PokemonType = [pokemon.types[0] as PokeType];
    } else if (pokemon?.types?.length === 2) {
        PokemonType = [pokemon.types[0] as PokeType, pokemon.types[1] as PokeType];
    } else {
        PokemonType = ["NORMAL"];
    }
    // Create form data state to keep track of form data.
    // The type is supposed to be the same as provided by api, except the id.
    const [formData, setFormData] = useState<PokemonRequestBody>({
        pokemonName: pokemon.name || "",
        pokemonImage: pokemon.imageLink || "",
        pokemonTypes: PokemonType
    });

    // Error state from redux store to display validation errors.
    const errorState = useAppSelector(getError);
    // Empty field on validation error.
    useEffect(() => {
        if (errorState.hasError) {
            setFormData((prevData) => ({...prevData, pokemonName: ""}));
        }
    }, [errorState]);
    const dispatch = useAppDispatch();

    // Types available for selection.
    const typeOptions = Object.keys(PokemonTypeEnum);

    // Type 1 Select Handler.
    const typeOneSelectHandler = (value: PokeType) => {
        const newData: PokemonRequestBody = {
            pokemonName: formData.pokemonName,
            pokemonImage: formData.pokemonImage,
            pokemonTypes: [value, formData.pokemonTypes[1]]
        }
        if (!checkTypeDuplicate(newData.pokemonTypes[0], newData.pokemonTypes[1])) {
            setFormData(newData);
        }
    }
    // Type 2 Select Handler.
    const typeTwoSelectHandler = (value: PokeType) => {
        const newData: PokemonRequestBody = {
            pokemonName: formData.pokemonName,
            pokemonImage: formData.pokemonImage,
            pokemonTypes: [formData.pokemonTypes[0], value]
        }
        if (!checkTypeDuplicate(newData.pokemonTypes[0], newData.pokemonTypes[1])) {
            setFormData(newData);
        }
    }

    // Reset error state and location history state when component unmounts.
    useEffect(() => {
        return () => {
            window.history.replaceState(null, "");
        }
    }, [dispatch]);

    // Submit handler for form.
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (update) {
            dispatch(updatePokemon({
                pokemonData: {
                    ...formData,
                    pokemonTypes: sanitizeTypeField(formData.pokemonTypes)
                },
                id: (pokemon as Pokemon).id
            }));
        } else {
            dispatch(createPokemon({
                ...formData,
                pokemonTypes: sanitizeTypeField(formData.pokemonTypes)
            }));
        }
    }

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
                            <BreadcrumbPage>{update ? ('Update Pokémon') : ('Create Pokémon')}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
                <div className="flex w-full max-w-sm flex-col gap-6">
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-center text-xl font-bold">{update ? ('Update Pokémon') : ('Create Pokémon')}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={submitHandler}>
                                    <div className="grid gap-8">
                                        <div className="grid gap-2">
                                            <Label htmlFor="trainerName">Pokémon Name</Label>
                                            <Input 
                                                type={"text"} 
                                                name={"pokemonName"} 
                                                value={formData.pokemonName} 
                                                onChange={(e) => setFormData({...formData, pokemonName: e.target.value})} 
                                                placeholder="Pikachu"
                                                required
                                            />
                                            <span 
                                                className={`
                                                    text-xs text-destructive 
                                                    ${
                                                        isApiErrorList(errorState.error) && 
                                                        errorState.error.length > 0 && 
                                                        errorState.error.find(err => err.field === "pokemonName") ? "visible" : "hidden"
                                                    }
                                                `} 
                                            >
                                                {
                                                    isApiErrorList(errorState.error) && 
                                                    errorState.error.length > 0 && 
                                                    errorState.error.find(err => err.field === "pokemonName")?.message
                                                }
                                            </span>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="pokemon" className="flex items-center gap-2 relative">Type 1</Label>
                                            <Select value={formData.pokemonTypes[0]} onValueChange={typeOneSelectHandler}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Type..." />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        typeOptions.map(option => (
                                                            option != formData.pokemonTypes[1] && (
                                                                <SelectItem
                                                                    key={option} 
                                                                    value={option} 
                                                                >
                                                                    {option}
                                                                </SelectItem>
                                                            )
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="pokemon" className="flex items-center gap-2 relative">
                                                <span>Type 2</span>
                                                <span className="block text-[13px] text-muted-foreground leading-none opacity-75">(Optional)</span>
                                            </Label>
                                            <Select name="pokemonTypes" value={formData.pokemonTypes[1]} onValueChange={typeTwoSelectHandler}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Type..." />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        typeOptions.map(option => (
                                                            option != formData.pokemonTypes[0] && (
                                                                <SelectItem 
                                                                    key={option} 
                                                                    value={option} 
                                                                >
                                                                    {option}
                                                                </SelectItem>
                                                            )
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                            <ul 
                                                className={`
                                                    text-xs text-destructive 
                                                    ${
                                                        isApiErrorList(errorState.error) && 
                                                        errorState.error.length > 0 && 
                                                        errorState.error.find(err => err.field === "pokemonTypes") ? "visible" : "hidden"
                                                    }
                                                `}
                                            >
                                                {
                                                    isApiErrorList(errorState.error) && 
                                                    errorState.error.length > 0 && 
                                                    errorState.error.map(err => {
                                                        return (
                                                            err.field === "pokemonTypes" && (
                                                                <li key={err.message}>{err.message}</li>
                                                            )
                                                        )
                                                    })
                                                }
                                            </ul>
                                            <span className="text-xs text-destructive hidden" id="pokemonTypes"></span>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="imageLink">
                                                <span>Image Link</span>
                                                <span className="block text-[13px] text-muted-foreground leading-none opacity-75">(Optional)</span>
                                            </Label>
                                            <Input 
                                                type={'url'} 
                                                id={"pokemonImage"} 
                                                name="pokemonImage"
                                                value={formData.pokemonImage || ""} 
                                                onChange={(e) => setFormData({...formData, pokemonImage: e.target.value})} 
                                                placeholder="URL" 
                                            />
                                        </div>
                                        <Button type={"submit"} className="cursor-pointer">{update ? ("Update") : ("Create")}</Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
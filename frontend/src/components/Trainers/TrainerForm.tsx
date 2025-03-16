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
    Card,
    CardHeader,
    CardContent,
    CardTitle
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MultiSelect, { MultiSelectProps } from "../MultiSelect";
import { navigationService } from "../../utils/navigation";
import { isApiErrorList, TrainerRequestBody, TrainerWithRelation } from "shared";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchPokemonList, getPokemonList, getStatus, resetStatus } from "../../features/pokemon/pokemonSlice";
import { clearError, getError } from "../../features/error/errorSlice";
import { useLocation } from "react-router";
import { createTrainer, updateTrainer } from "../../features/form/formSlice";

export default function TrainerForm(): ReactElement {
    // Get state from useLocation hook.
    const state = useLocation()?.state;
    // Initialize update flag and trainer object.
    // Default is false for update since in default case
    // the form is in create mode.
    // The trainer object is initialized with undefined values
    // for the same reason.
    let update = false;
    let trainer: Partial<TrainerWithRelation> = {
        id: undefined,
        name: "",
        imageLink: "",
        pokemon: []
    };
    // Check if there is any state passed via react router.
    if (state) {
        // Set update flag to true and initialize trainer object with 
        // provided state.
        const { ...tempTrainer }: TrainerWithRelation = state;
        trainer = tempTrainer;
        update = true;
    }
    // Create form data state to keep track of form data.
    // The type is supposed to be the same as provided by api, except the id.
    const [formData, setFormData] = useState<TrainerRequestBody>({
        trainerName: trainer.name || "",
        trainerImage: trainer.imageLink || "",
        pokemonList: trainer.pokemon?.map(poke => poke.name) || []
    });

    // Fetch pokemon list from redux state.
    const pokemon = useAppSelector(getPokemonList);
    const status = useAppSelector(getStatus);
    const dispatch = useAppDispatch();

    // Error state from redux store to display validation errors.
    const errorState = useAppSelector(getError);
    // Empty field if validation error.
    useEffect(() => {
        if (errorState.hasError) {
            setFormData((prevData) => ({...prevData, trainerName: ""}));
        }
    }, [errorState]);

    useEffect(() => {
        // If pokemon list has not been fetched yet, fetch it.
        if (status === 'idle') {
            dispatch(fetchPokemonList());
        }

        return () => {
            if (status === 'failed') {
                dispatch(resetStatus());
            }
        }
    }, [dispatch, status]);

    // onChange handler for multi select component.
    const handleMultiSelectChange: MultiSelectProps['onChange'] = (value: MultiSelectProps['value']) => {
        // Loop through all the pokemon in store and filter out those which have a match with the 
        // current selection and then map through the filtered ones to extract names.
        const selectedPokemon = pokemon.filter(poke => {
            if (value.find(item => item.value === poke.name)) {
                return true;
            }
        }).map(poke => poke.name);
        setFormData(prevData => ({...prevData, pokemonList: selectedPokemon}));
    }

    // Reset error state and location history state when component unmounts.
    useEffect(() => {
        return () => {
            dispatch(clearError());
            window.history.replaceState(null, "");
        }
    }, [dispatch]);

    // Submit handler for form.
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (update) {
            dispatch(updateTrainer({
                trainerData: {
                    ...formData
                },
                id: (trainer as TrainerWithRelation).id
            }));
        } else {
            dispatch(createTrainer({
                ...formData
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
                            <BreadcrumbLink className="cursor-pointer" onClick={() => navigationService.navigate("/trainers")}>Trainers</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{update ? ('Update Trainer') : ('Create Trainer')}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
                <div className="flex w-full max-w-sm flex-col gap-6">
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-center text-xl font-bold">{update ? ('Update Trainer') : ('Create Trainer')}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={submitHandler}>
                                    <div className="grid gap-8">
                                        <div className="grid gap-2">
                                            <Label htmlFor="trainerName">Trainer Name</Label>
                                            <Input 
                                                type={"text"} 
                                                name="trainerName" 
                                                value={formData.trainerName} 
                                                onChange={(e) => setFormData({...formData, trainerName: e.target.value})} 
                                                placeholder="Red" 
                                                required
                                            />
                                            <span 
                                                className={`
                                                    text-xs text-destructive 
                                                    ${
                                                        isApiErrorList(errorState.error) && 
                                                        errorState.error.length > 0 && 
                                                        errorState.error.find(err => err.field === "trainerName") ? "visible" : "hidden"
                                                    }
                                                `} 
                                            >
                                                {
                                                    isApiErrorList(errorState.error) && 
                                                    errorState.error.length > 0 && 
                                                    errorState.error.find(err => err.field === "trainerName")?.message
                                                }
                                            </span>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="pokemon" className="flex items-center gap-2 relative">Pokémon</Label>
                                            <MultiSelect 
                                                id="pokemonList"  
                                                options={pokemon.map(poke => ({
                                                        value: poke.name,
                                                        label: poke.name
                                                }))} 
                                                defaultValue={formData.pokemonList.map(poke => ({
                                                    value: poke,
                                                    label: poke
                                                }))} 
                                                value={formData.pokemonList.map(poke => ({
                                                    value: poke,
                                                    label: poke
                                                }))}
                                                onChange={handleMultiSelectChange}
                                            />
                                            <span className="text-xs text-muted-foreground">Select all Pokémon that are owned by trainer.</span>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="imageLink">
                                                <span>Image Link</span>
                                                <span className="block text-[13px] text-muted-foreground leading-none opacity-75">(Optional)</span>
                                            </Label>
                                            <Input 
                                                type={'url'} 
                                                name="trainerImage"  
                                                value={formData.trainerImage || ""} 
                                                onChange={(e) => setFormData({...formData, trainerImage: e.target.value})} 
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

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
import { TrainerWithRelation } from "shared";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchPokemonList, getPokemonList, getStatus, resetStatus } from "../../features/pokemon/pokemonSlice";

// If trainer is to be created, no need for other props.
// Else, other props are required for making api call and to populate form.
type TrainerFormProps = {
    update: false;
} & Partial<TrainerWithRelation> | {
    update: true;
} & Required<TrainerWithRelation>;

export default function TrainerForm({
    update = false,
    ...trainer
}: TrainerFormProps): ReactElement {

    // Create form data state to keep track of form data.
    // The type is supposed to be the same as provided by api, except the id.
    const [formData, setFormData] = useState<Omit<TrainerWithRelation, "id">>({
        name: trainer.name || "",
        imageLink: trainer.imageLink || null,
        pokemon: trainer.pokemon || []
    });

    // Fetch pokemon list from redux state.
    const pokemon = useAppSelector(getPokemonList);
    const status = useAppSelector(getStatus);
    const dispatch = useAppDispatch();

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
        const selectedPokemon = pokemon.filter(poke => {
            if (value.find(item => item.value === poke.name)) {
                return poke;
            }
        });
        setFormData(prevData => ({...prevData, pokemon: selectedPokemon}));
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
                                <form>
                                    <div className="grid gap-8">
                                        <div className="grid gap-2">
                                            <Label htmlFor="trainerName">Trainer Name</Label>
                                            <Input 
                                                type={"text"}
                                                id={"trainerName"} 
                                                value={formData.name} 
                                                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                                                placeholder="Red"
                                                required
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="pokemon" className="flex items-center gap-2 relative">Pokémon</Label>
                                            <MultiSelect 
                                                id="pokemon" 
                                                options={pokemon.map(poke => ({
                                                        value: poke.name,
                                                        label: poke.name
                                                }))} 
                                                defaultValue={formData.pokemon.map(poke => ({
                                                    value: poke.name,
                                                    label: poke.name
                                                }))} 
                                                value={formData.pokemon.map(poke => ({
                                                    value: poke.name,
                                                    label: poke.name
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
                                                id={"imageLink"} 
                                                value={formData.imageLink || ""} 
                                                onChange={(e) => setFormData({...formData, imageLink: e.target.value})} 
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

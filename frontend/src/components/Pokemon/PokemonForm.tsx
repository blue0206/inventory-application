import { ReactElement, useState } from "react";
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
import { navigationService } from "../../utils/navigation";
import { Pokemon } from "shared";

// If pokemon is to be created, no need for other props.
// Else, other props are required for making api call and to populate form.
type PokemonFormProps = { 
    update: false;
} & Partial<Pokemon> | { 
    update: true 
} & Required<Pokemon>;

export default function PokemonForm({
    update = false,
    ...pokemon
}: PokemonFormProps): ReactElement {

    // Create form data state to keep track of form data.
    // The type is supposed to be the same as provided by api, except the id.
    const [formData, setFormData] = useState<Omit<Pokemon, "id">>({
        name: pokemon.name || "",
        imageLink: pokemon.imageLink || null,
        types: pokemon.types || []
    });

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
                                <form>
                                    <div className="grid gap-8">
                                        <div className="grid gap-2">
                                            <Label htmlFor="trainerName">Pokémon Name</Label>
                                            <Input 
                                                type={"text"}
                                                id={"pokemonName"} 
                                                value={formData.name} 
                                                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                                                placeholder="Pikachu"
                                                required
                                            />
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
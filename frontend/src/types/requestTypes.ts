import { PokemonRequestBody, TrainerRequestBody } from "shared";

// Type for delete request.
export type DeleteParamsType = {
    id: number;
    secretKey: string;
}

// Type for Trainer update request.
export type UpdateTrainerRequestType = {
    id: number;
    trainerData: TrainerRequestBody;
};

// Type for Pokemon update request.
export type UpdatePokemonRequestType = {
    id: number;
    pokemonData: PokemonRequestBody;
};
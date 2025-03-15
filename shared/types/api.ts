import { Trainer as TrainerType, Pokemon as PokemonType, PokeType as Types } from '@prisma/client';
import { Prisma as PrismaNamespace } from '../prisma-client/prisma.js';

// Model Types
export type Trainer = TrainerType;
export type Pokemon = PokemonType;
export type PokeType = Types;

// Query Types
export type TrainerWithRelation = PrismaNamespace.TrainerGetPayload<{
    include: {
        pokemon: true;
    }
}>;
export type TrainerPokemon = PrismaNamespace.TrainerGetPayload<{
    select: {
        pokemon: {
            select: {
                id: true;
            }
        }
    }
}>;

// Request Body Types
export type TrainerRequestBody = {
	trainerName: string;
    trainerImage?: string;
    pokemonList: Array<Pokemon['name']>;
}
export type PokemonRequestBody = {
    pokemonName: string;
    pokemonImage?: string;
    pokemonTypes: [PokeType, PokeType?];
}

// Export Pokemon Type Enum
export const PokemonTypeEnum = Types;

// Export Pokemon type duplication check utility function.
export function checkTypeDuplicate(firstType: PokeType | undefined, secondType: PokeType | undefined): boolean {
    if (firstType == undefined && secondType == undefined) {
        return false; // No pokemon types provided, return false.
    }
    // Check for duplicate types.
    return firstType === secondType;
}

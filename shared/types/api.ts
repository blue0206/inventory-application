import { Trainer as TrainerType, Pokemon as PokemonType, PokeType as Types } from '@prisma/client';
import { Prisma as PrismaNamespace } from '../prisma-client/prisma.js';

// Prisma Client Type
// type Prisma = typeof prisma;

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
    pokemonList?: string[];
}
export type PokemonRequestBody = {
    pokemonName: string;
    pokemonImage?: string;
    pokemonTypes: [PokeType, PokeType?];
}

// Export Pokemon Type Enum
export const PokemonTypeEnum = Types;
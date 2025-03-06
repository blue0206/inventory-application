import { Trainer as TrainerType, Pokemon as PokemonType, PokeType as Types } from '@prisma/client';
import { prisma, Prisma as PrismaNamespace } from '../prisma-client/prisma';

// Prisma Client Type
type Prisma = typeof prisma;

// Model Types
export type Trainer = TrainerType;
export type Pokemon = PokemonType;
export type PokeType = Types;

// Query Types
export type Trainers = Awaited<ReturnType<Prisma['trainer']['findMany']>>;
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
export interface TrainerRequestBody {
	trainerName: string;
    trainerImage?: string;
    pokemonList?: string[];
}
export interface PokemonRequestBody {
    pokemonName: string;
    pokemonImage?: string;
    pokemonTypes: [PokeType, PokeType?];
}
import { Trainer as TrainerType, Pokemon as PokemonType, Type as TypeInModel, PokeType as Types } from '@prisma/client';
import { prisma } from '../prisma-client/prisma';

// Prisma Client Type
type Prisma = typeof prisma;

// Model Types
export type Trainer = TrainerType;
export type Pokemon = PokemonType;
export type Type = TypeInModel;
export type PokeType = Types;

// Query Types
export type Trainers = Awaited<ReturnType<Prisma['trainer']['findMany']>>;

// Request Body Types
export interface TrainerRequestBody {
	trainerName: string;
    trainerImage?: string;
    pokemonList?: string[];
}
export interface PokemonRequestBody {
    pokemonName: string;
    pokemonImage?: string;
    pokemonTypes: PokeType[];
}
export interface TypeRequestBody {
    typeName: PokeType;
}
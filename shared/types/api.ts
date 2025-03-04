import { Trainer as TrainerType, Pokemon as PokemonType, Type as TypeInModel } from '@prisma/client';
import { prisma } from '../prisma-client/prisma';

// Prisma Client Type
type Prisma = typeof prisma;

// Model Types
export type Trainer = TrainerType;
export type Pokemon = PokemonType;
export type Type = TypeInModel;

// Query Types
export type Trainers = Awaited<ReturnType<Prisma['trainer']['findMany']>>;

// Request Body Types
export interface CreateTrainerRequestBody {
	trainerName: string;
    trainerImage: string;
    pokemonList: CreatePokemonRequestBody[];
}
export interface CreatePokemonRequestBody {
    pokemonName: string;
    pokemonImage: string;
    pokemonTypes: CreateTypeRequestBody[];
}
export interface CreateTypeRequestBody {
    typeName: string;
}
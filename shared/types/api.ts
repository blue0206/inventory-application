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
	name: string;
    imageLink: string;
    pokemon: CreatePokemonRequestBody[];
}
export interface CreatePokemonRequestBody {
    name: string;
    imageLink: string;
    types: string[];
}
export interface CreateTypeRequestBody {
    name: string;
}
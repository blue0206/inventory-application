import { Trainer as TrainerType, Pokemon as PokemonType, Type as TypeInModel } from '@prisma/client';
import { prisma } from '../prisma-client/prisma';

type Prisma = typeof prisma;

export type Trainer = TrainerType;
export type Pokemon = PokemonType;
export type Type = TypeInModel;

export type Trainers = Awaited<ReturnType<Prisma['trainer']['findMany']>>;
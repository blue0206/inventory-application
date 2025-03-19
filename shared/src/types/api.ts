import { Trainer as TrainerType, Pokemon as PokemonType } from '@prisma/client';
import { Prisma } from '@prisma/client';

// Model Types
export type Trainer = TrainerType;
export type Pokemon = PokemonType;
export type PokeType = 
    | 'NORMAL'
    | 'FIRE'
    | 'WATER'
    | 'GRASS'
    | 'ELECTRIC'
    | 'ICE'
    | 'FIGHTING'
    | 'POISON'
    | 'GROUND'
    | 'FLYING'
    | 'PSYCHIC'
    | 'BUG'
    | 'ROCK'
    | 'GHOST'
    | 'DRAGON'
    | 'DARK'
    | 'STEEL'
    | 'FAIRY';

// Query Types
export type TrainerWithRelation = Prisma.TrainerGetPayload<{
    include: {
        pokemon: true;
    }
}>;
export type TrainerPokemon = Prisma.TrainerGetPayload<{
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
export type DeleteRequestBody = {
    secretKey: string;
}

// Export Pokemon Type Enum
export enum PokemonTypeEnum {
    NORMAL = 'NORMAL',
    FIRE = 'FIRE',
    WATER = 'WATER',
    GRASS = 'GRASS',
    ELECTRIC = 'ELECTRIC',
    ICE = 'ICE',
    FIGHTING = 'FIGHTING',
    POISON = 'POISON',
    GROUND = 'GROUND',
    FLYING = 'FLYING',
    PSYCHIC = 'PSYCHIC',
    BUG = 'BUG',
    ROCK = 'ROCK',
    GHOST = 'GHOST',
    DRAGON = 'DRAGON',
    DARK = 'DARK',
    STEEL = 'STEEL',
    FAIRY = 'FAIRY'
}

// Export Pokemon type duplication check utility function.
export function checkTypeDuplicate(firstType: PokeType | undefined, secondType: PokeType | undefined): boolean {
    if (firstType == undefined && secondType == undefined) {
        return false; // No pokemon types provided, return false.
    }
    // Check for duplicate types.
    return firstType === secondType;
}

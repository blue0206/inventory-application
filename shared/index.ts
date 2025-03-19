export type { 
    Trainer, 
    Pokemon, 
    PokeType, 
    TrainerWithRelation, 
    TrainerPokemon, 
    TrainerRequestBody, 
    PokemonRequestBody,
    DeleteRequestBody 
} from "./types/api.ts";
export { PokemonTypeEnum, checkTypeDuplicate } from "./types/api.js";
export { ApiResponse, ApiErrorResponse } from "./utils/ApiResponse.js";
export { 
    BadRequestError, 
    NotFoundError, 
    ValidationError, 
    isApiErrorList, 
    isCustomError 
} from "./utils/ApiError.js";
export type { ApiErrorList, ApiErrorTypes } from "./utils/ApiError.ts"

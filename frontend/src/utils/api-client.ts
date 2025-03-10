import type { 
    TrainerRequestBody, 
    PokemonRequestBody,
    ApiErrorList, 
    Trainer,
    Pokemon,
    TrainerWithRelation
} from "shared";
import {
    ApiErrorResponse,
    ApiResponse
} from "shared";
import { CustomError } from "./custom-error";

class ApiClient {
    private async fetch<DataType>(
        endpoint: string,
        options: FetchOptions
    ): Promise<DataType> {
        const { method = "GET", body, headers }: FetchOptions = options;

        const response: Response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`, {
            method,
            body: body ? JSON.stringify(body) : undefined,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        });

        if (!response.ok) {
            throw new CustomError(response.status, response.statusText);
        }

        const data: 
            | ApiResponse<DataType> 
            | ApiErrorResponse<ApiErrorList | Record<string, unknown> | null> = await response.json();

        if ('error' in data) {
            throw new CustomError(data.statusCode, data.message, data.error, data.success);
        }

        return data.data;
    }

    async getTrainersList(): Promise<Trainer[]> {
        return this.fetch<Trainer[]>("trainers/", {
            method: "GET"
        });
    }

    async getTrainerById(id: number | string): Promise<TrainerWithRelation> {
        return this.fetch<TrainerWithRelation>(`trainers/${id}/`, {
            method: "GET"
        });
    }

    async createTrainer(trainerData: TrainerRequestBody): Promise<number> {
        return this.fetch<number>("trainers/", {
            method: "POST",
            body: trainerData
        });
    }

    async updateTrainer(trainerData: TrainerRequestBody, id: number | string): Promise<number> {
        return this.fetch<number>(`trainers/${id}`, {
            method: "PUT",
            body: trainerData
        });
    }

    async deleteTrainer(id: number | string, secretKey: string): Promise<void> {
        this.fetch<void>(`trainers/${id}?secretKey=${secretKey}/`, {
            method: "DELETE",
        });
    }

    async getPokemonList(): Promise<Pokemon[]> {
        return this.fetch<Pokemon[]>("pokemon/", {
            method: "GET"
        });
    }

    async getPokemonById(id: number | string): Promise<Pokemon> {
        return this.fetch<Pokemon>(`pokemon/${id}/`, {
            method: "GET"
        });
    }

    async createPokemon(pokemonData: PokemonRequestBody): Promise<number> {
        return this.fetch<number>("pokemon/", {
            method: "POST",
            body: pokemonData
        });
    }

    async updatePokemon(pokemonData: PokemonRequestBody, id: number | string): Promise<number> {
        return this.fetch<number>(`pokemon/${id}/`, {
            method: "PUT",
            body: pokemonData
        });
    }

    async deletePokemon(id: number | string, secretKey: string): Promise<void> {
        this.fetch<void>(`pokemon/${id}?secretKey=${secretKey}/`, {
            method: "DELETE",
        });
    }
}

type FetchOptions = {
    method: "GET" | "POST" | "PUT" | "DELETE";
    body?:  TrainerRequestBody | PokemonRequestBody;
    headers?: Record<string, string>;
}

export const apiClient = new ApiClient();
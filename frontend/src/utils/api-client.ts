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
import { CustomError, FetchError } from "./custom-error";

class ApiClient {
    private async fetch<DataType>(
        endpoint: string,
        options: FetchOptions
    ): Promise<DataType> {
        const { method = "GET", body, headers }: FetchOptions = options;

        // Wrap in try-catch to handle any unforeseen errors.
        try {
            // Make the request with provided options.
            const response: Response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`, {
                method,
                body: body ? JSON.stringify(body) : undefined,
                headers: {
                    'Content-Type': 'application/json',
                    ...headers
                }
            });
    
            // Check if response is not ok.
            // Such response is sent from server in ApiErrorResponse format.
            if (!response.ok) {
                // Parse the ApiErrorResponse object.
                const data:
                    ApiErrorResponse<ApiErrorList | Record<string, unknown> | null> 
                    = await response.json();

                // Throw a custom error with parsed API Error Response data.
                throw new CustomError(
                  data.statusCode,
                  data.message,
                  data.error,
                  data.success
                );
                throw new CustomError(response.status, response.statusText);
            }
            // If everything went well, parse and return the response.
            const data: ApiResponse<DataType> = await response.json();
            return data.data;
        } catch (error) {
            // If any unknown errors are encountered, throw a custom fetch error.
            console.error(error);
            throw new FetchError("Something went wrong while fetching data. Please try again later.");
        }
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
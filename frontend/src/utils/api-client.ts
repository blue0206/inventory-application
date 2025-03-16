import type { 
    TrainerRequestBody, 
    PokemonRequestBody,
    ApiErrorList, 
    Trainer,
    Pokemon,
    TrainerWithRelation,
    DeleteRequestBody
} from "shared";
import {
    ApiErrorResponse,
    ApiResponse
} from "shared";
import { ApiError, FetchError } from "./custom-error";

type FetchOptions = {
    method: "GET" | "POST" | "PUT" | "DELETE";
    body?:  TrainerRequestBody | PokemonRequestBody | DeleteRequestBody;
    headers?: Record<string, string>;
}

class ApiClient {
    private async fetch<DataType>(
        endpoint: string,
        options: FetchOptions
    ): Promise<ApiResponse<DataType>> {
        // Destructure options into individual variables and default init method.
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
                    ApiErrorResponse<ApiErrorList | null> 
                    = await response.json();

                // Throw a custom error with parsed API Error Response data.
                throw new ApiError(
                  data.statusCode,
                  data.message,
                  data.error,
                  data.success
                );
            }
            // If everything went well, parse and return the response.
            const data: ApiResponse<DataType> = await response.json();
            return data;
        } catch (error) {
            // If any unknown errors are encountered, throw a custom fetch error.
            console.error(error);
            throw new FetchError("Something went wrong while fetching data. Please try again later.");
        }
    }

    // Method to fetch list of trainers.
    async getTrainersList(): Promise<ApiResponse<Trainer[]>> {
        return this.fetch<Trainer[]>("trainers/", {
            method: "GET"
        });
    }

    // Method to fetch a single trainer by ID.
    async getTrainerById(id: number): Promise<ApiResponse<TrainerWithRelation>> {
        return this.fetch<TrainerWithRelation>(`trainers/${id}/`, {
            method: "GET"
        });
    }

    // Method to create a new trainer via a POST request.
    async createTrainer(trainerData: TrainerRequestBody): Promise<ApiResponse<number>> {
        return this.fetch<number>("trainers/", {
            method: "POST",
            body: trainerData
        });
    }

    // Method to update an existing trainer via a PUT request.
    async updateTrainer(trainerData: TrainerRequestBody, id: number): Promise<ApiResponse<number>> {
        return this.fetch<number>(`trainers/${id}`, {
            method: "PUT",
            body: trainerData
        });
    }

    // Method to delete an existing trainer via a DELETE request.
    async deleteTrainer(data: DeleteRequestBody, id: number): Promise<void> {
        this.fetch<void>(`trainers/${id}/`, {
            method: "DELETE",
            body: data
        });
    }

    // Methods to fetch a list of pokemon.
    async getPokemonList(): Promise<ApiResponse<Pokemon[]>> {
        return this.fetch<Pokemon[]>("pokemon/", {
            method: "GET"
        });
    }

    // Method to fetch a single pokemon by ID.
    async getPokemonById(id: number): Promise<ApiResponse<Pokemon>> {
        return this.fetch<Pokemon>(`pokemon/${id}/`, {
            method: "GET"
        });
    }

    // Method to create a new pokemon via a POST request.
    async createPokemon(pokemonData: PokemonRequestBody): Promise<ApiResponse<number>> {
        return this.fetch<number>("pokemon/", {
            method: "POST",
            body: pokemonData
        });
    }

    // Method to update an existing pokemon via a PUT request.
    async updatePokemon(pokemonData: PokemonRequestBody, id: number): Promise<ApiResponse<number>> {
        return this.fetch<number>(`pokemon/${id}/`, {
            method: "PUT",
            body: pokemonData
        });
    }

    // Method to delete an existing pokemon via a DELETE request.
    async deletePokemon(data: DeleteRequestBody, id: number): Promise<void> {
        this.fetch<void>(`pokemon/${id}/`, {
            method: "DELETE",
            body: data
        });
    }
}

// Export singleton of API Client.
export const apiClient = new ApiClient();

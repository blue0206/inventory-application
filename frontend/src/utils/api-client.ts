import type { 
    TrainerRequestBody, 
    PokemonRequestBody,
    ApiErrorList, 
    Trainer
} from "shared";
import {
    ApiErrorResponse,
    ApiResponse
} from "shared";

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
            throw new Error(response.statusText);
        }

        const data: 
            | ApiResponse<DataType> 
            | ApiErrorResponse<ApiErrorList | Record<string, unknown> | void> = await response.json();

        if ('error' in data) {
            if (data.statusCode === 500) {
                throw new Error("Internal Server Error");
            } else {
                throw new Error(data.message);
            }
        }

        return data.data;
    }

    async getTrainersList(): Promise<Trainer[]> {
        return this.fetch<Trainer[]>('trainers/', {
            method: "GET"
        });
    }
}

type FetchOptions = {
    method: "GET" | "POST" | "PUT" | "DELETE";
    body?:  TrainerRequestBody | PokemonRequestBody;
    headers?: Record<string, string>;
}

export const apiClient = new ApiClient();
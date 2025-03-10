import { Request, Response } from "express";
import asyncHandler from 'express-async-handler';
import type { ApiErrorList, Pokemon, PokemonRequestBody } from "shared";
import { prisma, ApiResponse, BadRequestError, NotFoundError, ValidationError } from "shared";

const createPokemon = asyncHandler(async (req: Request, res: Response) => {
    // Get pokemon details from request body.
    const { pokemonName, pokemonImage, pokemonTypes }: PokemonRequestBody = req.body;

    // Initialize error message fields.
    const errors: ApiErrorList = [];
    // Validate the pokemon name.
    if (!pokemonName.trim()) {
        errors.push({
            message: "Pokemon name is required.",
            field: "pokemonName"
        });
    }
    // Validate the pokemon type array.
    if (pokemonTypes.length < 1) {
        errors.push({
            message: "At least one type is required.",
            field: "pokemonTypes"
        });
    } else if (pokemonTypes.length > 2) {
        errors.push({
            message: "Maximum two types allowed.",
            field: "pokemonTypes"
        });
    }
    // Throw an error if there are validation errors.
    if (errors.length > 0) {
        throw new ValidationError("Validation Error", errors);
    }

    // Create a new pokemon in the database.
    const pokemon: Pokemon = await prisma.pokemon.create({
        data: {
            name: pokemonName,
            types: pokemonTypes,
            imageLink: pokemonImage ? pokemonImage.trim() : null,
        }
    });

    // Return pokemon id for redirection purpose.
    res.status(201).json(
        new ApiResponse<number>(
            201, 
            pokemon.id, 
            `Successfully created pokemon ${pokemon.name}`, 
            true
        )
    );
}); 

const getPokemon = asyncHandler(async (req: Request, res: Response) => {
    // Get all pokemon from db.
    const pokemon: Pokemon[] = await prisma.pokemon.findMany();

    // Check if the array is empty. If so, return a not found error.
    if (pokemon.length === 0) {
        throw new NotFoundError("Not Found", [{ message: "No pokemon found." }]);
    }

    // Return the list of pokemon.
    res.status(200).json(
        new ApiResponse<Pokemon[]>(
            200,
            pokemon,
            `Successfully retrieved all pokemon.`,
            true
        )
    );
});

const getPokemonById = asyncHandler(async (req: Request, res: Response) => {
    // Get pokemon id from request params.
    const { pokemonId } = req.params;

    // Check if pokemon id exists.
    if (!pokemonId.trim()) {
        throw new BadRequestError("Bad Request", [{ message: "Missing required parameter: pokemonId" }]);
    }

    // Check if pokemon id is a number.
    if (isNaN(Number(pokemonId))) {
        throw new BadRequestError("Bad Request", [{ message: "pokemonId must be a number." }]);
    }

    // Get pokemon from database.
    const pokemon: Pokemon | null = await prisma.pokemon.findUnique({
        where: {
            id: Number(pokemonId)
        }
    });

    // Check if pokemon was found.
    if (!pokemon) {
        throw new NotFoundError("Not Found", [{ message: "Pokemon not found." }]);
    }

    // Return pokemon.
    res.status(200).json(
        new ApiResponse<Pokemon>(
            200,
            pokemon,
            `Successfully retrieved pokemon with id ${pokemonId}.`,
            true
        )
    );
});

const updatePokemon = asyncHandler(async (req: Request, res: Response) => {
    // Get pokemon id from request params and details from request body.
    const { pokemonId } = req.params;
    const { pokemonName, pokemonTypes, pokemonImage }: PokemonRequestBody = req.body;

    // Check if pokemon id exists.
    if (!pokemonId.trim()) {
        throw new BadRequestError("Bad Request", [{ message: "Missing required parameter: pokemonId" }]);
    }
    // Check if pokemon id is a number.
    if (isNaN(Number(pokemonId))) {
        throw new BadRequestError("Bad Request", [{ message: "pokemonId must be a number." }]);
    }

    // Initialize error message fields.
    const errors: ApiErrorList = [];
    // Validate pokemon name.
    if (!pokemonName.trim()) {
        errors.push({
            message: "Pokemon name is required.",
            field: "pokemonName"
        });
    }
    // Validate the pokemon type array.
    if (pokemonTypes.length < 1) {
        errors.push({
            message: "At least one type is required.",
            field: "pokemonTypes"
        });
    } else if (pokemonTypes.length > 2) {
        errors.push({
            message: "Maximum two types allowed.",
            field: "pokemonTypes"
        });
    }
    // Throw an error if there are validation errors.
    if (errors.length > 0) {
        throw new ValidationError("Validation Error", errors);
    }

    // Update pokemon in database.
    const pokemon: Pokemon = await prisma.pokemon.update({
        where: {
            id: Number(pokemonId),
        },
        data: {
            name: pokemonName,
            types: pokemonTypes,
            imageLink: pokemonImage ? pokemonImage : null,
        },
    });

    // Return pokemon id for redirection purpose.
    res.status(200).json(
        new ApiResponse<number>(
            200,
            pokemon.id,
            `Successfully updated pokemon with id ${pokemonId}`,
            true
        )
    );
});

const deletePokemon = asyncHandler(async (req: Request, res: Response) => {
    // Get pokemon id from request params.
    const { pokemonId } = req.params;

    // Check if pokemon id exists.
    if (!pokemonId.trim()) {
        throw new BadRequestError("Bad Request", [{ message: "Missing required parameter: pokemonId" }]);
    }
    // Check if pokemon id is a number.
    if (isNaN(Number(pokemonId))) {
        throw new BadRequestError("Bad Request", [{ message: "pokemonId must be a number." }]);
    }

    // Delete pokemon.
    await prisma.pokemon.delete({
        where: {
            id: Number(pokemonId)
        }
    });

    // Return no content status code.
    res.status(204).end();
});

export {
    createPokemon,
    getPokemon,
    getPokemonById,
    updatePokemon,
    deletePokemon
}
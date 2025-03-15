import { Request, Response } from "express";
import asyncHandler from 'express-async-handler';
import type { ApiErrorList, Pokemon, PokemonRequestBody } from "shared";
import { prisma, ApiResponse, BadRequestError, NotFoundError, ValidationError, checkTypeDuplicate } from "shared";

const fetchPokemonImage = async (name: string): Promise<string | undefined> => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase().trim()}`);
    const data = await response.json();
    
    return data.sprites?.front_default;
}

const createPokemon = asyncHandler(async (req: Request, res: Response) => {
    // Get pokemon details from request body.
    const { pokemonName, pokemonImage, pokemonTypes }: PokemonRequestBody = req.body;

    // Initialize error message fields.
    const errors: ApiErrorList = [];
    // Validate the pokemon name.
    if (!pokemonName.trim()) {
        errors.push({
            message: "Please provide a Pokémon name.",
            field: "pokemonName"
        });
    }
    // Validate the pokemon type array.
    if (pokemonTypes.length < 1) {
        errors.push({
            message: "At least one Pokémon type is required.",
            field: "pokemonTypes"
        });
    } else if (pokemonTypes.length > 2) {
        errors.push({
            message: "Maximum two Pokémon types are allowed.",
            field: "pokemonTypes"
        });
    } else if (checkTypeDuplicate(pokemonTypes[0], pokemonTypes[1])) {
        errors.push({
            message: "Please provide two different Pokémon types.",
            field: "pokemonTypes"
        });
    }
    // Throw an error if there are validation errors.
    if (errors.length > 0) {
        throw new ValidationError(
          "Invalid or incomplete data provided.",
          errors
        );
    }

    // If pokemon image link not provided, get from api.
    let fetchedImage = pokemonImage;
    if (!pokemonImage) {
        fetchedImage = await fetchPokemonImage(pokemonName);
    }

    // Create a new pokemon in the database.
    const pokemon: Pokemon = await prisma.pokemon.create({
        data: {
            name: pokemonName,
            types: pokemonTypes,
            imageLink: fetchedImage ? fetchedImage.trim() : fetchedImage,
        }
    });

    // Return pokemon id for redirection purpose.
    res.status(201).json(
        new ApiResponse<number>(
            201, 
            pokemon.id, 
            `Pokémon ${pokemon.name} has been created successfully!`, 
            true
        )
    );
}); 

const getPokemon = asyncHandler(async (req: Request, res: Response) => {
    // Get all pokemon from db.
    const pokemon: Pokemon[] = await prisma.pokemon.findMany();

    // Check if the array is empty. If so, return a not found error.
    if (pokemon.length === 0) {
        throw new NotFoundError(
            "The requested resource could not be found.", 
            [{ message: "Oops! It seems there are no Pokémon." }]
        );
    }

    // Return the list of pokemon.
    res.status(200).json(
        new ApiResponse<Pokemon[]>(
            200,
            pokemon,
            `All Pokémon retrieved successfully.`,
            true
        )
    );
});

const getPokemonById = asyncHandler(async (req: Request, res: Response) => {
    // Get pokemon id from request params.
    const { pokemonId } = req.params;

    // Check if pokemon id exists.
    if (!pokemonId.trim()) {
        throw new BadRequestError(
            "The request was invalid or cannot be otherwise processed.", 
            [{ message: "We couldn't find the Pokémon you're looking for. Please try again." }]
        );
    }

    // Check if pokemon id is a number.
    if (isNaN(Number(pokemonId))) {
        throw new BadRequestError(
            "The request was invalid or cannot be otherwise processed.", 
            [{ message: "The resource you're trying to access does not exist!" }]
        );
    }

    // Get pokemon from database.
    const pokemon: Pokemon | null = await prisma.pokemon.findUnique({
        where: {
            id: Number(pokemonId)
        }
    });

    // Check if pokemon was found.
    if (!pokemon) {
        throw new NotFoundError(
            "The requested resource could not be found.", 
            [{ message: "Oops! The pokémon you're looking for does not exist." }]
        );
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
        throw new BadRequestError(
            "The request was invalid or cannot be otherwise processed.", 
            [{ message: "We couldn't find the Pokémon you're looking for. Please try again." }]
        );
    }
    // Check if pokemon id is a number.
    if (isNaN(Number(pokemonId))) {
        throw new BadRequestError(
          "The request was invalid or cannot be otherwise processed.",
          [{ message: "The resource you're trying to access does not exist!" }]
        );
    }

    // Initialize error message fields.
    const errors: ApiErrorList = [];
    // Validate pokemon name.
    if (!pokemonName.trim()) {
        errors.push({
            message: "Please provide a Pokémon name.",
            field: "pokemonName"
        });
    }
    // Validate the pokemon type array.
    if (pokemonTypes.length < 1) {
      errors.push({
        message: "At least one Pokémon type is required.",
        field: "pokemonTypes",
      });
    } else if (pokemonTypes.length > 2) {
      errors.push({
        message: "Maximum two Pokémon types are allowed.",
        field: "pokemonTypes",
      });
    } else if (checkTypeDuplicate(pokemonTypes[0], pokemonTypes[1])) {
      errors.push({
        message: "Please provide two different Pokémon types.",
        field: "pokemonTypes",
      });
    }
    // Throw an error if there are validation errors.
    if (errors.length > 0) {
        throw new ValidationError(
          "Invalid or incomplete data provided.",
          errors
        );
    }

    // If pokemon image link not provided, get from api.
    let fetchedImage = pokemonImage;
    if (!pokemonImage) {
        fetchedImage = await fetchPokemonImage(pokemonName);
    }

    // Update pokemon in database.
    const pokemon: Pokemon = await prisma.pokemon.update({
        where: {
            id: Number(pokemonId),
        },
        data: {
            name: pokemonName,
            types: pokemonTypes,
            imageLink: fetchedImage ? fetchedImage.trim() : null,
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
        throw new BadRequestError(
          "The request was invalid or cannot be otherwise processed.",
          [{ message: "The resource you're trying to delete does not exist!" }]
        );
    }
    // Check if pokemon id is a number.
    if (isNaN(Number(pokemonId))) {
        throw new BadRequestError(
          "The request was invalid or cannot be otherwise processed.",
          [{ message: "The resource you're trying to delete does not exist!" }]
        );
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
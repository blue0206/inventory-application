import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { prisma } from "../db/prisma-client.js";
import {
    ApiResponse,
    NotFoundError,
    BadRequestError,
    ValidationError
} from 'shared';
import type {
    Trainer, 
    TrainerWithRelation, 
    TrainerPokemon, 
    TrainerRequestBody
} from 'shared';

const createTrainer = asyncHandler(async (req: Request, res: Response) => {
    // Get trainer details from request body.
    const { trainerName, trainerImage, pokemonList }: TrainerRequestBody = req.body;

    // Check if trainer name is provided.
    if (!trainerName.trim()) {
        throw new ValidationError(
            "Invalid or incomplete data provided.", 
            [{ message: "Please provide a Trainer name.", field: "trainerName" }]
        );
    }

    // Create trainer in database.
    const trainer: Trainer = await prisma.trainer.create({
        data: {
            name: trainerName,
            imageLink: trainerImage ? trainerImage : null,
            pokemon: {
                connect: pokemonList.map((pokeName: string) => (
                    {
                        name: pokeName 
                    }
                ))
            }
        }
    });
    
    // Return trainer id for redirection purpose in frontend.
    res.status(201).json(
        new ApiResponse<number>(
            201, 
            trainer.id, 
            `Trainer ${trainer.name} has been created successfully!`, 
            true
        )
    );
}) 

const getTrainers = asyncHandler(async (req: Request, res: Response) => {
    const trainers: Trainer[] = await prisma.trainer.findMany();

    // Check if array is empty. If so, return a not found error.
    if (trainers.length === 0) {
        throw new NotFoundError("The requested resource could not be found.", [
          { message: "Oops! It seems there are no Trainers." }
        ]);
    }
    // Return the list of trainers.
    res.status(200).json(
        new ApiResponse<Trainer[]>(
            200, 
            trainers, 
            "All trainers retrieved successfully.",
            true
        )
    );
});

const getTrainerById = asyncHandler(async (req: Request, res: Response) => {
    // Get trainer id from request params.
    const { trainerId } = req.params;
    // Check if trainerId exists.
    if (!trainerId.trim()) {
        throw new BadRequestError(
            "The request was invalid or cannot be otherwise processed.", 
            [{ message: "We couldn't find the Trainer you're looking for. Please try again." }]
        );
    }
    // Check if trainerId is a number.
    if (isNaN(Number(trainerId))) {
        throw new BadRequestError(
          "The request was invalid or cannot be otherwise processed.",
          [{ message: "The resource you're trying to access does not exist!" }]
        );
    }
    // Get trainer with trainerId from database.
    const trainer: TrainerWithRelation | null = await prisma.trainer.findUnique({
        where: {
            id: Number(trainerId)
        },
        include: {
            pokemon: true,
        }
    });
    // Check if trainer was found.
    if (!trainer) {
        throw new NotFoundError(
            "The requested resource could not be found.", 
            [{ message: "Oops! The trainer you're looking for does not exist." }]
        );
    }
    // Return trainer.
    res.status(200).json(
        new ApiResponse<TrainerWithRelation>(
            200,
            trainer,
            `${trainer.name.endsWith("s") ? trainer.name + "'" : trainer.name + "'s"} profile loaded successfully! Check out their Pokémon collection!`,
            true
        )
    );
});

const updateTrainer = asyncHandler(async (req: Request, res: Response) => {
    // Get trainer details from request body and params.
    const { trainerId } = req.params;
    const { trainerName, trainerImage, pokemonList }: TrainerRequestBody = req.body;

    // Check if trainerId exists.
    if (!trainerId.trim()) {
        throw new BadRequestError(
            "The request was invalid or cannot be otherwise processed.", 
            [{ message: "We couldn't find the Trainer you're looking for. Please try again." }]
        );
    }
    // Check if trainerId is a number.
    if (isNaN(Number(trainerId))) {
        throw new BadRequestError(
          "The request was invalid or cannot be otherwise processed.",
          [{ message: "The resource you're trying to access does not exist!" }]
        );
    }

    // Check if trainer name is provided.
    if (!trainerName.trim()) {
        throw new ValidationError(
            "Invalid or incomplete data provided.", 
            [{ message: "Please provide a Trainer name.", field: "trainerName" }]
        );
    }

    // Disconnect all pokemon in trainer model.
    const connectedPokemonIds: TrainerPokemon | null = await prisma.trainer.findUnique({
        where: {
            id: Number(trainerId),
        },
        select: {
            pokemon: {
                select: {
                    id: true
                }
            }
        }
    });
    // Disconnect all trainer's pokemon relation.
    await prisma.trainer.update({
        where: {
            id: Number(trainerId),
        },
        data: {
            pokemon: {
                disconnect: connectedPokemonIds?.pokemon.map(poke => ({ id: poke.id }))
            }
        }
    });
    // Update trainer and connect to new pokemon.
    const trainer: Trainer = await prisma.trainer.update({
        where: {
            id: Number(trainerId)
        },
        data: {
            name: trainerName,
            imageLink: trainerImage ? trainerImage : null,
            pokemon: {
                connect: pokemonList.map((pokemon: string) => ({
                    name: pokemon
                }))
            },
        },
    });
    
    // Return trainer id for redirection purpose in frontend.
    res.status(200).json(
        new ApiResponse<number>(
            200,
            trainer.id,
            `The trainer details have been updated successfully!`,
            true
        )
    );
});

const deleteTrainer = asyncHandler(async (req: Request, res: Response) => {
    // Get trainer id from request params.
    const { trainerId } = req.params;

    // Check if trainerId exists.
    if (!trainerId.trim()) {
        throw new BadRequestError(
            "The request was invalid or cannot be otherwise processed.", 
            [{ message: "The resource you're trying to delete does not exist!" }]
        );
    }
    // Check if trainerId is a number.
    if (isNaN(Number(trainerId))) {
        throw new BadRequestError(
          "The request was invalid or cannot be otherwise processed.",
          [{ message: "The resource you're trying to delete does not exist!" }]
        );
    }

    // Delete trainer.
    await prisma.trainer.delete({
        where: {
            id: Number(trainerId)
        }
    });

    // Return no content status code.
    res.status(204).end();
});

export {
    createTrainer,
    getTrainers,
    getTrainerById,
    updateTrainer,
    deleteTrainer
}

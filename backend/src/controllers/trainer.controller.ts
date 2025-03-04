import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { prisma, Trainers, ApiResponse, NotFoundError, BadRequestError } from 'shared';

const createTrainer = asyncHandler(async (req: Request, res: Response) => {

}) 

const getTrainers = asyncHandler(async (req: Request, res: Response) => {
    const trainers: Trainers = await prisma.trainer.findMany();

    // Check if array is empty. If so, return a not found error.
    if (trainers.length === 0) {
        throw new NotFoundError("Not Found", [{ message: "No trainers found." }])
    }
    // Return the list of trainers.
    res.status(200).json(
        new ApiResponse<Trainers>(
            200, 
            trainers, 
            "Successfully retrieved all trainers.",
            true
        )
    );
});

const getTrainerById = asyncHandler(async (req: Request, res: Response) => {}) 

const updateTrainer = asyncHandler(async (req: Request, res: Response) => {}) 

const deleteTrainer = asyncHandler(async (req: Request, res: Response) => {}) 

export {
    createTrainer,
    getTrainers,
    getTrainerById,
    updateTrainer,
    deleteTrainer
}
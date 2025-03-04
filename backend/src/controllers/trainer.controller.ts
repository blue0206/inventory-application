import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { 
    prisma, 
    Trainer,
    Trainers, 
    ApiResponse, 
    NotFoundError, 
    BadRequestError 
} from 'shared';

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

const getTrainerById = asyncHandler(async (req: Request, res: Response) => {
    // Get trainer id from request params.
    const { trainerId } = req.params;
    // Check if trainerId exists.
    if (!trainerId.trim()) {
        throw new BadRequestError("Bad Request", [{ message: "Missing required parameter: trainerId" }]);
    }
    // Check if trainerId is a number.
    if (isNaN(Number(trainerId))) {
        throw new BadRequestError("Bad Request", [{ message: "trainerId must be a number" }]);
    }
    // Get trainer with trainerId from database.
    const trainer: Trainer | null = await prisma.trainer.findUnique({
        where: {
            id: Number(trainerId)
        }
    });
    // Check if trainer was found.
    if (!trainer) {
        throw new NotFoundError("Not Found", [{ message: "No trainers found." }]);
    }
    // Return trainer.
    res.status(200).json(
        new ApiResponse<Trainer>(
            200,
            trainer,
            `Successfully retrieved trainer ${trainer.name}.`,
            true
        )
    );
});

const updateTrainer = asyncHandler(async (req: Request, res: Response) => {}) 

const deleteTrainer = asyncHandler(async (req: Request, res: Response) => {}) 

export {
    createTrainer,
    getTrainers,
    getTrainerById,
    updateTrainer,
    deleteTrainer
}
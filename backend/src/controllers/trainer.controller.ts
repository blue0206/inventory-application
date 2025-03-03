import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

const createTrainer = asyncHandler(async (req: Request, res: Response) => {}) 

const getTrainers = asyncHandler(async (req: Request, res: Response) => {}) 

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
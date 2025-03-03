import { Request, Response } from "express";
import asyncHandler from 'express-async-handler';

const createType = asyncHandler(async (req: Request, res: Response) => {}) 

const getTypes = asyncHandler(async (req: Request, res: Response) => {}) 

const getTypeById = asyncHandler(async (req: Request, res: Response) => {}) 

const updateType = asyncHandler(async (req: Request, res: Response) => {}) 

const deleteType = asyncHandler(async (req: Request, res: Response) => {}) 

export {
    createType,
    getTypes,
    getTypeById,
    updateType,
    deleteType
}
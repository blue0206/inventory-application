import { Request, Response } from "express";
import asyncHandler from 'express-async-handler';

const createPokemon = asyncHandler(async (req: Request, res: Response) => {}) 

const getPokemon = asyncHandler(async (req: Request, res: Response) => {}) 

const getPokemonById = asyncHandler(async (req: Request, res: Response) => {}) 

const updatePokemon = asyncHandler(async (req: Request, res: Response) => {}) 

const deletePokemon = asyncHandler(async (req: Request, res: Response) => {}) 

export {
    createPokemon,
    getPokemon,
    getPokemonById,
    updatePokemon,
    deletePokemon
}
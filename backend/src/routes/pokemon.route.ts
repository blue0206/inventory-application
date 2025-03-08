import { Router } from 'express';
import {
    createPokemon,
    getPokemon,
    getPokemonById,
    updatePokemon,
    deletePokemon
} from '../controllers/pokemon.controller.js';
import verifySecretKey from '../middlewares/auth.middleware.js';

const pokemonRouter = Router();

// Get all pokemon.
pokemonRouter.get('/', getPokemon);
// Create new pokemon.
pokemonRouter.post('/', createPokemon);
// Get pokemon by id.
pokemonRouter.get('/:pokemonId', getPokemonById);
// Update pokemon by id.
pokemonRouter.put('/:pokemonId', updatePokemon);
// Delete pokemon by id if secret key is valid.
pokemonRouter.delete('/:pokemonId', verifySecretKey, deletePokemon);

export default pokemonRouter;
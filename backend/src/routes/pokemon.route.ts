import { Router } from 'express';
import {
    createPokemon,
    getPokemon,
    getPokemonById,
    updatePokemon,
    deletePokemon
} from '../controllers/pokemon.controller';

const pokemonRouter = Router();

// Get all pokemon.
pokemonRouter.get('/', getPokemon);
// Create new pokemon.
pokemonRouter.post('/', createPokemon);
// Get pokemon by id.
pokemonRouter.get('/:pokemonId', getPokemonById);
// Update pokemon by id.
pokemonRouter.put('/:pokemonId', updatePokemon);
// Delete pokemon by id.
pokemonRouter.delete('/:pokemonId', deletePokemon);

export default pokemonRouter;
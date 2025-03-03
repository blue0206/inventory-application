import { Router } from 'express';

const pokemonRouter = Router();

// Get all pokemon.
pokemonRouter.get('/');
// Get pokemon by id.
pokemonRouter.get('/:pokemonId');
// Delete pokemon by id.
pokemonRouter.delete('/:pokemonId');

export default pokemonRouter;
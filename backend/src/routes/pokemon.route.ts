import { Router } from 'express';

const pokemonRouter = Router();

// Get all pokemon.
pokemonRouter.get('/');
// Create new pokemon.
pokemonRouter.post('/');
// Get pokemon by id.
pokemonRouter.get('/:pokemonId');
// Update pokemon by id.
pokemonRouter.put('/:pokemonId');
// Delete pokemon by id.
pokemonRouter.delete('/:pokemonId');

export default pokemonRouter;
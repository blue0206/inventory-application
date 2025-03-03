import { Router } from "express";

const typeRouter = Router();

// Get all types.
typeRouter.get('/');
// Create new type.
typeRouter.post('/');
// Get type by id.
typeRouter.get('/:id');
// Update type by id.
typeRouter.put('/:id');
// Delete type by id.
typeRouter.delete('/:id');

export default typeRouter;
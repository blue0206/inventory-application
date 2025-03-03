import { Router } from "express";

const typeRouter = Router();

// Get all types.
typeRouter.get('/');
// Get type by id.
typeRouter.get('/:id');
// Delete type by id.
typeRouter.delete('/:id');

export default typeRouter;
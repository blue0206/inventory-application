import { Router } from "express";
import {
    createType,
    getTypes,
    getTypeById,
    updateType,
    deleteType
} from '../controllers/type.controller';

const typeRouter = Router();

// Get all types.
typeRouter.get('/', getTypes);
// Create new type.
typeRouter.post('/', createType);
// Get type by id.
typeRouter.get('/:id', getTypeById);
// Update type by id.
typeRouter.put('/:id', updateType);
// Delete type by id.
typeRouter.delete('/:id', deleteType);

export default typeRouter;
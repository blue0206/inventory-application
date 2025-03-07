import { Router } from 'express';
import { 
    createTrainer, 
    getTrainers, 
    getTrainerById, 
    updateTrainer, 
    deleteTrainer 
} from '../controllers/trainer.controller.js';

const trainerRouter = Router();

// Get all trainers.
trainerRouter.get('/', getTrainers);
// Create new trainer.
trainerRouter.post('/', createTrainer);
// Get trainer by id.
trainerRouter.get('/:trainerId', getTrainerById);
// Update trainer by id.
trainerRouter.put('/:trainerId', updateTrainer);
// Delete trainer by id.
trainerRouter.delete('/:trainerId', deleteTrainer);

export default trainerRouter;
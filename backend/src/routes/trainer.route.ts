import { Router } from 'express';

const trainerRouter = Router();

// Get all trainers.
trainerRouter.get('/');
// Create new trainer.
trainerRouter.post('/');
// Get trainer by id.
trainerRouter.get('/:trainerId');
// Update trainer by id.
trainerRouter.put('/:trainerId');
// Delete trainer by id.
trainerRouter.delete('/:trainerId');

export default trainerRouter;
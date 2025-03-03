import { Router } from 'express';

const trainerRouter = Router();

// Get all trainers.
trainerRouter.get('/');
// Get trainer by id.
trainerRouter.get('/:trainerId');
// Delete trainer by id.
trainerRouter.delete('/:trainerId');

export default trainerRouter;
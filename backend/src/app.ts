import express from 'express';
import 'dotenv/config';
import { trainerRouter, pokemonRouter, typeRouter } from './routes';

const app = express();

// Routes
app.use('/api/v1/trainers', trainerRouter);
app.use('/api/v1/pokemon', pokemonRouter);
app.use('/api/v1/types', typeRouter);
// TODO: Give an error with code 404 if the route doesn't exist
app.route('/api/v1/*');

// Server
const PORT = process.env.port || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}(http://localhost:${PORT})`);
});
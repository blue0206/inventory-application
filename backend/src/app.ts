import express from 'express';
import 'dotenv/config';
import { indexRouter, trainerRouter, pokemonRouter, typeRouter } from './routes';

const app = express();

// Routes
app.use('/', indexRouter);
app.use('/trainers', trainerRouter);
app.use('/pokemon', pokemonRouter);
app.use('/types', typeRouter);

// Server
const PORT = process.env.port || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}(http://localhost:${PORT})`);
});
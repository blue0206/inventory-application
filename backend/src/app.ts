import express from 'express';
import 'dotenv/config';
import indexRouter from './routes/index.route';
import trainerRouter from './routes/trainer.route';
import pokemonRouter from './routes/pokemon.route';
import typeRouter from './routes/type.route';

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
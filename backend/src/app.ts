import express from 'express';
import 'dotenv/config';
import indexRouter from './routes/index.route';

const app = express();

// Routes
app.use('/', indexRouter);

// Server
const PORT = process.env.port || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}(http://localhost:${PORT})`);
});
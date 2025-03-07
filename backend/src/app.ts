import express, { Request, Response } from 'express';
import 'dotenv/config';
import { trainerRouter, pokemonRouter } from './routes/index.js';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ApiErrorList, ApiResponse, isCustomError, NotFoundError } from 'shared';

const app = express();
// Middlewares
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/trainers', trainerRouter);
app.use('/api/v1/pokemon', pokemonRouter);
// Give an error with code 404 if the route doesn't exist.
app.use("/*", (req: Request, res: Response) => {
  throw new NotFoundError("Not Found");
});

// Error Middleware
app.use((err: Error, req: Request, res: Response) => {
    if (isCustomError(err)) {
        res.status(err.statusCode).json(
            new ApiResponse<ApiErrorList>(
                err.statusCode,
                err.serializeErrors(),
                err.message,
                err.success
            )
        );
    } else if (err instanceof PrismaClientKnownRequestError) {
        res.status(400).json(
            new ApiResponse<Record<string, unknown>>(
                409,
                err.meta,
                "The data already exists.",
                false
            )
        );
    } else {
        res.status(500).json(
            new ApiResponse<null>(
                500,
                null,
                "Internal server error",
                false
            )
        );
    }
});

// Server
const PORT = process.env.port || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}(http://localhost:${PORT})`);
});
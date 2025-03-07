import express, { NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import { trainerRouter, pokemonRouter } from './routes/index.js';
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library';
import { ApiErrorList, ApiResponse, isCustomError, NotFoundError } from 'shared';

const app = express();
// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/api/v1/trainers', trainerRouter);
app.use('/api/v1/pokemon', pokemonRouter);
// Give an error with code 404 if the route doesn't exist.
app.use("/*", (req: Request, res: Response) => {
  throw new NotFoundError("Not Found");
});

// Error Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
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
        if (err.code === "P2000") {
            res.status(422).json(
                new ApiResponse<Record<string, unknown>>(
                    422,
                    err.meta,
                    "The provided data is too long for the data type.",
                    false
                )
            );
        } else if (err.code === "P2002") {
            res.status(409).json(
                new ApiResponse<Record<string, unknown>>(
                    409,
                    err.meta,
                    "The data already exists.",
                    false
                )
            );
        } else {
            res.status(500).json(
                new ApiResponse<Record<string, unknown>>(
                    500,
                    err.meta,
                    err.message,
                    false
                )
            );
        }
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
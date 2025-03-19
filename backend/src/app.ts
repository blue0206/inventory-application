import express, { NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import cors from 'cors';
import { trainerRouter, pokemonRouter } from './routes/index.js';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ApiErrorList, ApiErrorResponse, isCustomError, NotFoundError } from 'shared';

const app = express();
// Middlewares
app.use(cors({
    origin: process.env.CLIENT_URL
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/api/v1/trainers', trainerRouter);
app.use('/api/v1/pokemon', pokemonRouter);
// Give an error with code 404 if the route doesn't exist.
app.use("/*", (req: Request, res: Response) => {
    throw new NotFoundError(
        "The requested resource could not be found.", 
        [{ message: "This is not the webpage you are looking for." }]
    );
});

// Error Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    // Log the error for details.
    console.error('An error occurred was encountered:', err);
    if (isCustomError(err)) {
        res.status(err.statusCode).json(
            new ApiErrorResponse<ApiErrorList>(
                err.statusCode,
                err.serializeErrors(),
                err.message,
                err.success
            )
        );
    } else if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === "P2000") {
            res.status(422).json(
                new ApiErrorResponse<null>(
                    422,
                    null,
                    "The provided data exceeds the maximum allowed length.",
                    false
                )
            );
        } else if (err.code === "P2002") {
            res.status(409).json(
                new ApiErrorResponse<null>(
                    409,
                    null,
                    "The data already exists.",
                    false
                )
            );
        } else {
            res.status(500).json(
                new ApiErrorResponse<null>(
                    500,
                    null,
                    "Something went wrong. Please try again later.",
                    false
                )
            );
        }
    } else {
        res.status(500).json(
            new ApiErrorResponse<null>(
                500,
                null,
                "Something went wrong. Please try again later.",
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

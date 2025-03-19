import { NextFunction, Request, Response } from 'express';
import { DeleteRequestBody, UnauthorizedError } from 'shared';

const verifySecretKey = (req: Request, res: Response, next: NextFunction) => {
    // Get the secret key from the request body.
    const { secretKey }: DeleteRequestBody = req.body;
    // Throw unauthorized request error if secret key is incorrect.
    if (secretKey.toString().trim().toLowerCase() !== process.env.SECRET_KEY) {
        throw new UnauthorizedError(
          "The request failed authentication or authorization.",
          [{ message: "The secret key is invalid.", field: "secretKey" }]
        );
    }  
    // If the secret key is correct, then continue to the next middleware.
    next();
}

export default verifySecretKey;

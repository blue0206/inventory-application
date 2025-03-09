import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from 'shared/utils/ApiError.js';

const verifySecretKey = (req: Request, res: Response, next: NextFunction) => {
    // Get the secret key from the request body.
    const { secretKey } = req.query;
    // Throw unauthorized request error if secret key is incorrect.
    if (secretKey.toString().trim().toLowerCase() !== process.env.SECRET_KEY) {
        throw new UnauthorizedError("Unauthorized Request", [{ message: "The secret key is invalid", field: "secretKey" }]);
    }  
    // If the secret key is correct, then continue to the next middleware.
    next();
}

export default verifySecretKey;

import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from 'shared/utils/ApiError.js';

const verifyPassword = (req: Request, res: Response, next: NextFunction) => {
    // Get the password/secret key from the request body.
    const { password } = req.body;
    // Throw unauthorized request error if password/secret key is incorrect.
    if (password.trim().toLowerCase() !== process.env.PASSWORD) {
        throw new UnauthorizedError("Unauthorized Request", [{ message: "The secret key is invalid", field: "secretKey" }]);
    }
    // If the password/secret key is correct, then continue to the next middleware.
    next();
}

export default verifyPassword;
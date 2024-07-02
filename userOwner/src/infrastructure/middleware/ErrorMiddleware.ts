import { Request, Response, NextFunction } from 'express';

const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const error = err as Error; 
    console.error(err.message); 

    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

    res.status(statusCode).json({
        message: err.message
    });
};

export default errorHandler;

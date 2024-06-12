import { NextFunction, Request, Response } from "express";

const golbalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = 500;
  const message = err.message || "Something went wrong";
  res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });
};

export default golbalErrorHandler;

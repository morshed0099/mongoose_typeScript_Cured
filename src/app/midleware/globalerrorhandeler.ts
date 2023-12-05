/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalErrorHandeler = (
  error:any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // eslint-disable-next-line prefer-const
  let statusCode = error.statusCode || 500
  // eslint-disable-next-line prefer-const
  let message = error.message || 'something went wrong !!'

  return res.status(statusCode).json({
    success: false,
    message,
    error,
  })
  next()
}

export default globalErrorHandeler

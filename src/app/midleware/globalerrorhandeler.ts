import { ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'
import config from '../config'
import { ErrorSource } from '../interface/errorSoruce.interface'
import { zodErrorHandeler } from '../errors/zodError'
import { mongoseErrorHandeler } from '../errors/mongosseErrror'
import { castErrorHandelder } from '../errors/castErrorHandelder'
import { handelDuplicateError } from '../errors/handelDuplicateError'
import AppError from '../util/sendErrorwithCode'

const globalErrorHandeler: ErrorRequestHandler = (error, req, res, next) => {
  
  let statusCode = 500
  let message = 'something went wrong !!'
  let errorSource: ErrorSource = [
    {
      path: '',
      message: 'smonething went wrong',
    },
  ]

  if (error instanceof ZodError) {
    const simplifiedError = zodErrorHandeler(error)

    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorSource = simplifiedError.errorSource
  } else if (error?.name === 'ValidationError') {
    const simplifyError = mongoseErrorHandeler(error)
    statusCode = simplifyError.statusCode
    message = simplifyError.message
    errorSource = simplifyError.errorSource
  } else if (error?.name === 'CastError') {
    const simplifyError = castErrorHandelder(error)
    statusCode = simplifyError.statusCode
    message = simplifyError.message
    errorSource = simplifyError.errorSource
  } else if (error?.code === 11000) {
    const simplifyError = handelDuplicateError(error)
    statusCode = simplifyError.statusCode
    message = simplifyError.message
    errorSource = simplifyError.errorSource
  } else if (error instanceof AppError) {
    statusCode=error.statusCode
    message=error.message
    errorSource= [
      {
        path:'',
        message:error?.message
      }
    ]
  }else if (error instanceof Error) {  
    message=error.message
    errorSource= [
      {
        path:'',
        message:error?.message
      }
    ]
  }
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    errorSource,
    error,
    stack: config.NODE_ENV === 'development' ? error?.stack : '',
    
  })
  next()
}

export default globalErrorHandeler

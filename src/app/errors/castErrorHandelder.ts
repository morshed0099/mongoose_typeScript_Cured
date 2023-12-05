import mongoose from 'mongoose'
import { ErrorRes, ErrorSource } from '../interface/errorSoruce.interface'

export const castErrorHandelder = (err: mongoose.Error.CastError): ErrorRes => {
  const errorSource: ErrorSource = [
    {
      path: err.path,
      message: err.message,
    },
  ]

  return {
    errorSource,
    message:err.message,
    statusCode:400
  }
}

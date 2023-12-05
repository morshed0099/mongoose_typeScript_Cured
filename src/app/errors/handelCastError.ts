import mongoose from 'mongoose'
import { ErrorRes, ErrorSource } from '../interface/errorSoruce.interface'


export const handelCastError = (err: mongoose.Error.CastError): ErrorRes => {

    const errorSource:ErrorSource=[{
        path:err.path,
        message:err.message
    }]
  const statusCode = 400
  return {
    statusCode,
    errorSource,
    message:err.message
   

  }
}

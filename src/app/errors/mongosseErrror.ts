import mongoose from "mongoose";
import { ErrorSource } from "../interface/errorSoruce.interface";

export const mongoseErrorHandeler = (
    err: mongoose.Error.ValidationError,
  ) => {
    const errorSource: ErrorSource = Object.values(err.errors).map(
      (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
        return {
          path: val.path,
          message: val.message
        };
      },
    );
  
    const statusCode = 400;
  
    return {
      statusCode,
      message: 'mongoose Error',
      errorSource,
    };
  };
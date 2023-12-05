/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRes, ErrorSource } from '../interface/errorSoruce.interface'

export const handelDuplicateError = (err:any): ErrorRes => {
  const match = err.message.match(/"([^"]*)"/)

  // The extracted value will be in the first capturing group
  const extractedMessage = match && match[1]
  const errorSource: ErrorSource = [
    {
      path: '',
      message: `${extractedMessage} is already exists`,
    },
  ]
  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid ID',
    errorSource,
  };
}

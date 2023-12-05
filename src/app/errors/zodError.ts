import { ZodError, ZodIssue } from 'zod'
import { ErrorSource } from '../interface/errorSoruce.interface'

export const zodErrorHandeler = (err: ZodError) => {
  const errorSource: ErrorSource = err.issues.map((issu: ZodIssue) => {
    return {
      path: issu?.path[issu.path.length - 1],
      message: issu.message,
    }
  })
  const statusCode = 400
  return {
    statusCode,
    errorSource,
    message: 'validation error',
  }
}

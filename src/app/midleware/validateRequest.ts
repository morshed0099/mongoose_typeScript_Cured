import { NextFunction, Request, Response } from "express"
import { AnyZodObject } from "zod"

export const validate = (schma: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await schma.parseAsync({
          body: req.body,
        })
        next()
      } catch (error) {
        next(error)
      }
    }
  }
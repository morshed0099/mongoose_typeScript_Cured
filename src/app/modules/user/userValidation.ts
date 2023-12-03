import { z } from 'zod'

export const userValidationScehma = z.object({
  id:z.string().uuid({message:"id must be unique"}),
  password: z
    .string({ invalid_type_error: 'password type will be string' })
    .max(20, { message: 'password is not more than 20 charecters' })
    .optional(), 
})

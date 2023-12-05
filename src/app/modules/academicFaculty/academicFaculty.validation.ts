import { z } from 'zod'

const createAcademicValidatein = z.object({
  body: z.object({
    name: z.string({
      required_error: 'name is required',
      invalid_type_error: 'type is string',
    }),
  }),
})


export const AcademicValidation = {
  createAcademicValidatein,
}

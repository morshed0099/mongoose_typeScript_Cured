import { z } from 'zod'

const prequisitValidatetion = z.object({
  course: z.string(),
  isDeleted: z.boolean().default(false).optional(),
})

const couseCreatedVlidate = z.object({
  body: z.object({
    title: z.string({
      invalid_type_error: 'title must be (a to z as string)',
      required_error: 'couse titile is requed !!',
    }),
    code: z.number({ required_error: 'couse code must needed !!' }),
    prefix: z.string({ required_error: 'couse prefix must be needed !!' }),
    credist: z.number({ required_error: 'couse Creadits mub be needed !!' }),
    peRequistieCourse: z.array(prequisitValidatetion).optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
})

export const courseValidation = {
  couseCreatedVlidate,
}

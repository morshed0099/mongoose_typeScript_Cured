import { z } from 'zod'

const createAcademicValidationDepartment = z.object({
  body: z.object({
    name: z.string({
      required_error: 'academic department name is requied!!',
      invalid_type_error: 'academic name type is string',
    }),
    academicFaculty: z.string(),
  }),
})

export const academicDepartmentValidation = {
  createAcademicValidationDepartment,
}

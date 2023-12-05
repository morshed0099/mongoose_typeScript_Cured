import { z } from 'zod'
import {
  academicSemisterCode,
  academicSemisterName,
  month,
} from './academicSemisterConstat'

const createAcademicSemisterValidation = z.object({
  body: z.object({
    name: z.enum([...academicSemisterName] as [string, ...string[]], {
      required_error: 'name is requied',
    }),
    year: z.string({
      required_error: 'year is requied',
      invalid_type_error: 'year is string format',
    }),
    code: z.enum([...academicSemisterCode] as [string, ...string[]], {
      required_error: 'code is requied',
    }),
    startMonth: z.enum([...month] as [string, ...string[]], {
      required_error: 'start month is requied',
    }),
    endMonth: z.enum([...month] as [string, ...[string]], {
      required_error: 'end month is requied',
    }),
  }),
})

export const academicSemisterValidation={
    createAcademicSemisterValidation
}

import * as z from 'zod'

// Define Zod schema for the user information
const userSchema = z.object({
  firstName: z
    .string({ required_error: 'First name is required' })
    .min(2, 'First name should be at least 2 characters')
    .max(50),
  lastName: z
    .string({ required_error: 'Last name is required' })
    .min(2, 'Last name should be at least 2 characters')
    .max(50),
  middleName: z.string().max(50).optional(),
})

// Define Zod schema for the admin information
const createAdminValidation = z.object({
  body: z.object({
    id: z.string({ required_error: 'id is requiered' }),
    user: z.string({ required_error: 'user id is requied' }),
    contacNo: z.string({ required_error: 'Contact number is required' }),
    dateOfBirth: z.string({required_error:"date of birth is requied"}),      
    email: z.string({ required_error: 'email is requied' }).email(),
    emergencyContactNo: z.string({
      required_error: 'Emergency contact number is required',
    }),
    gender: z.enum(['Male', 'Female'], {
      required_error: 'Gender is required',
    }),
    isDeleted: z.boolean().default(false),
    managementDepartment: z.string({
      required_error: 'Management department is required',
    }),
    name: userSchema,
    needPasswordChange: z.boolean().default(false),
    password: z.string({ required_error: 'Password is required' }),
    permanentAddress: z.string({
      required_error: 'Permanent address is required',
    }),
    presentAddress: z.string({ required_error: 'Present address is required' }),
    profileImage: z.string().optional(),
    role: z.string(),
  }),
})

export const adminValidation = {
  createAdminValidation,
}

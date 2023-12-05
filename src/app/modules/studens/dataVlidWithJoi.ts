import { z } from 'zod'

const nameSchema = z.object({
  firstName: z
    .string({ required_error: 'name is required' })
    .trim()
    .max(20, { message: 'First name must be a string' }),
  middleName: z.string().optional(),
  lastName: z.string({ required_error: 'last name is requerd' }),
})

const localGuardianSchema = z.object({
  name: z.string({ required_error: 'name is requied' }),
  occupation: z.string({ required_error: 'ocupation is required' }),
  address: z.string({ required_error: 'address is required' }),
  contactNo: z.string({ required_error: 'contact no is requied' }),
})

const guardianSchema = z.object({
  fatherName: z.string({ required_error: 'father name is required' }),
  fatherContactNo: z.string({
    required_error: 'father contact no is required',
  }),
  motherContactNo: z.string({ required_error: 'mother contact is requied' }),
  fatherOccupation: z.string({
    required_error: 'father occupation is required',
  }),
  motherOccupation: z.string({
    required_error: 'mother occupation is required',
  }),
  motherName: z.string({ required_error: 'mother name is required' }),
})

const studentSchemaValid = z.object({
  body: z.object({
    student: z.object({
      id: z.string({ required_error: 'id is requierd' }),
      name: nameSchema,
      gender: z.enum(['Male', 'Female', 'other'], {
        required_error: 'gernder is required',
      }),
      bloodGroup: z.enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'], {
        required_error: 'blood group is requried',
      }),
      email: z.string().email(),
      guardian: guardianSchema,
      localGuardian: localGuardianSchema,
      presentAddress: z.string({
        required_error: 'present address is required',
      }),
      permanentAddress: z.string({
        required_error: 'present address is required',
      }),
      admissonSemister: z.string(),
      emergencyContactNo: z.string({
        required_error: 'emergency contact no is required',
      }),
      academicDepartment: z.string(),
    }),
  }),
})

export default studentSchemaValid

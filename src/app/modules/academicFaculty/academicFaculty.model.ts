import { Schema, model } from 'mongoose'
import { TacademicFaculty } from './academicFacult.interface'

const academicFacaltySchema = new Schema<TacademicFaculty>(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  },
)


export const AcademicFaculty = model<TacademicFaculty>(
  'AcademicFaculty',
  academicFacaltySchema,
)

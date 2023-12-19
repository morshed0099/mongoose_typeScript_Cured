import { Schema, model } from 'mongoose'
import { TacademicDepartment } from './academicDepartment.interface'
import AppError from '../../util/sendErrorwithCode'

const academicDepartmentSchema = new Schema<TacademicDepartment>(
  {
    name: { type: String, required: true, unique: true },
    academicFaculty: { type: Schema.Types.ObjectId, ref: 'AcademicFaculty' },
  },
  {
    timestamps: true,
  },
)



academicDepartmentSchema.pre('save', async function (next) {
  const name = this.name
  const isExists = await AcademicDepartment.findOne({ name })
  if (isExists) {
    throw new AppError(404, 'department alredy exists !!')
  }
  next()
})
export const AcademicDepartment = model<TacademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
)

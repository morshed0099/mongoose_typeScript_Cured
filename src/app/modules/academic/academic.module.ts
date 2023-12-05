import { Schema, model } from 'mongoose'
import { TAcademic } from './academic.interface'
import {
  academicSemisterCode,
  academicSemisterName,
  month,
} from './academicSemisterConstat'

const academinSchema = new Schema<TAcademic>(
  {
    name: {
      type: String,
      enum: academicSemisterName,
      required: [true, 'name is requied'],
    },
    code: {
      type: String,
      enum: academicSemisterCode,
      required: [true, 'code is requied'],
    },
    endMonth: {
      type: String,
      enum: month,
      required: [true, 'endmonth is required'],
    },
    startMonth: {
      type: String,
      enum: month,
      required: [true, 'endmonth is required'],
    },
    year: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

academinSchema.pre('save', async function (next) {
  const isExsits = await AcademicSmister.findOne({
    name: this.name,
    year: this.year,
  })
  if (isExsits) {
    throw new Error('academic semister alredy exists !!')
  }
  next()
})

export const AcademicSmister = model<TAcademic>(
  'AcademicSmister',
  academinSchema,
)

import { Schema, model } from 'mongoose'
import { TCourseFaculty, Tcourse, TpeRequisiteCouse } from './course.interface'
import AppError from '../../util/sendErrorwithCode'

const preRequistiteCoueseSchema = new Schema<TpeRequisiteCouse>(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  },
)

const couseSchema = new Schema<Tcourse>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    code: {
      type: Number,
      trim: true,
      required: true,
    },
    credist: {
      type: Number,
      trim: true,
      required: true,
    },
    prefix: { type: String, required: true },
    peRequistieCourse: [preRequistiteCoueseSchema],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

couseSchema.pre('save', async function (next) {
  const isExists = await Cours.findOne({
    title: this.title,
  })
  if (isExists) {
    throw new AppError(500, 'course alredy exists!!')
  }
  next()
})
export const Cours = model<Tcourse>('Course', couseSchema)

const couseFacultySchema = new Schema<TCourseFaculty>({
  couse: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  faculties: {
    type: [Schema.Types.ObjectId],
    unique: true,
    ref:"Faculty"
  },
})

export const CourseFaculty = model<TCourseFaculty>(
  'CourseFaculty',
  couseFacultySchema,
)

import mongoose, { Types } from 'mongoose'

export type TpeRequisiteCouse = {
  course: Types.ObjectId
  isDeleted: boolean
}

export type Tcourse = {
  title: string
  prefix: string
  code: number
  credist: number
  peRequistieCourse: TpeRequisiteCouse[]
  isDeleted?: boolean
}

export type TCourseFaculty = {
  couse: mongoose.Types.ObjectId
  faculties: [mongoose.Types.ObjectId]
}

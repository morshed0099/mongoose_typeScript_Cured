import { Types } from 'mongoose'

export type TacademicDepartment = {
  name: string
  faculty: Types.ObjectId
}

import { StudentModel } from '../student.model'
import { Student } from './students.interface'

const createStudentIntoDD = async (student: Student) => {
  const result = await StudentModel.create(student)
  return result
}

const getStudenIntoDb = async () => {
  const result = await StudentModel.find()
  return result
}

const getSingleStudenByID = async (id: string) => {
  const result = await StudentModel.findOne({ id })
  return result
}

export const StudentServices = {
  createStudentIntoDD,
  getStudenIntoDb,
  getSingleStudenByID,
}

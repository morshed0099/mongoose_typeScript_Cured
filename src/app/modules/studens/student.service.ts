import { StudentModel } from './student.model'

const getStudenIntoDb = async () => {
  const result = await StudentModel.find()
  return result
}

const getSingleStudenByID = async (id: string) => {
  const result = await StudentModel.findOne({id})
  return result
}

export const StudentServices = {
  getStudenIntoDb,
  getSingleStudenByID,
}

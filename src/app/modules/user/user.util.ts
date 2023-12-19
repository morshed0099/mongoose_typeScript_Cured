import { TAcademic } from '../academic/academic.interface'

import { User } from './user.model'

const findStudentId = async (typeOfUser: string) => {
  const studentId = await User.findOne({ role: typeOfUser }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()

  return studentId?.id ? studentId.id : undefined
}
// 2030 03 0001

export const genaratedStudenId = async (payload: TAcademic) => {
  let currentId = (0).toString()
  const lastStudent = await findStudentId('student')
  const lastStudentYear = lastStudent?.substring(0, 4)
  const lasStudenCode = lastStudent?.substring(4, 6)

  if (
    lastStudent &&
    payload.code === lasStudenCode &&
    payload.year === lastStudentYear
  ) {
    currentId = lastStudent.substring(6)
  }

  const result = (Number(currentId) + 1).toString().padStart(4, '0')
  const incrementId = `${payload.year}${payload.code}${result}`
  return incrementId
}
export const genaretedFacultyId = async () => {
  const oldId = await findStudentId('faculty')
  let newId = (0).toString()
  if (oldId) {
    newId = oldId?.substring(2)
  }
  const result = (Number(newId) + 1).toString().padStart(4, '0')
  const incrementId = `F-${result}`
  return incrementId
}

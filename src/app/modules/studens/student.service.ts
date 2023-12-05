/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import AppError from '../../util/sendErrorwithCode'
import { StudentModel } from './student.model'
import mongoose from 'mongoose'
import { User } from '../user/user.model'
import { Student } from './students.interface'

const getStudenIntoDb = async () => {
  const result = await StudentModel.find().populate('admissonSemister')
  return result
}

const getSingleStudenByID = async (id: string) => {
  if (!(await StudentModel.isStudentExsits(id))) {
    throw new AppError(httpStatus.NOT_FOUND, 'student not fround')
  }
  const result = await StudentModel.findOne({ id }).populate('admissonSemister')
  return result
}
const deleteStudent = async (studentId: string) => {
  if (!(await StudentModel.isStudentExsits(studentId))) {
    throw new AppError(httpStatus.NOT_FOUND, 'student not froundsss')
  }
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const student = await StudentModel.findOneAndUpdate(
      { id: studentId },
      { isDeleted: true },
      { new: true, session, upsert: true },
    )
    if (!student) {
      throw new Error('student deleted fail')
    }

    const user = await User.findOneAndUpdate(
      { id: studentId },
      { isDeleted: true },
      { new: true, session, upsert: true },
    )
    if (!user) {
      throw new Error('student deleted fail')
    }
    console.log(student)
    await session.commitTransaction()
    await session.endSession()
    return student
  } catch (error: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, error.message)
  }
}

const updateStudent = async (
  studentId: string,
  studentData: Partial<Student>,
): Promise<Student | null> => {
  if (!(await StudentModel.isStudentExsits(studentId))) {
    throw new AppError(httpStatus.NOT_FOUND, 'student not found')
  }

  const { localGuardian, name, guardian, ...restData } = studentData

  const modifyData: Record<string, unknown> = {
    ...restData,
  }

  if (localGuardian && Object.keys(localGuardian)) {
    for (const [key, value] of Object.entries(localGuardian))
      modifyData[`localGuardian.${key}`] = value
  }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name))
      modifyData['name' + '.' + key] = value
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian))
      modifyData['guardian' + '.' + key] = value
  }

  const result = await StudentModel.findOneAndUpdate(
    { id: studentId },
    modifyData,
    { new: true, runValidators: true },
  )
  return result
}
export const StudentServices = {
  getStudenIntoDb,
  getSingleStudenByID,
  deleteStudent,
  updateStudent,
}

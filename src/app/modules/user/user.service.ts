import mongoose from 'mongoose'
import config from '../../config'
import AppError from '../../util/sendErrorwithCode'
import { TAcademic } from '../academic/academic.interface'
import { AcademicSmister } from '../academic/academic.module'
import { TFaculty } from '../faculty/faculty,interface'
import { Faculty } from '../faculty/faculty.module'
import { StudentModel } from '../studens/student.model'
import { Student } from '../studens/students.interface'
import { Tuser } from './user.interface'
import { User } from './user.model'
import { genaratedStudenId, genaretedFacultyId } from './user.util'
import httpStatus from 'http-status'

const createStudentIntoDD = async (payload: Student, password: string) => {
  //   if (await StudentModel.isStudentExsits(student.id)) {
  //     throw new Error('student alredy exists !!')
  //   }

  // const user: NewUser = {}
  const user: Partial<Tuser> = {}

  user.password = password || config.password

  const academicSemister = await AcademicSmister.findById(
    payload.admissonSemister,
  )
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    user.id = await genaratedStudenId(academicSemister as TAcademic)
    user.role = 'student'

    const newUser = await User.create([user], { session })

    if (!newUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'user not created fail !!!')
    }

    payload.id = newUser[0].id
    payload.user = newUser[0]._id

    const newStudent = await StudentModel.create([payload], { session })
    // populate grand father and child document in and one document
    // .populate([
    //   {
    //     path: 'academicDepartment',
    //     populate: {
    //       path: 'faculty',
    //     },
    //   },
    //   'admissonSemister',
    // ])
    if (!newStudent.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'student not created successfully !!',
      )
    }
    await session.commitTransaction()
    await session.endSession()
    return newStudent
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, error.message)
  }
}

const createFacult = async (payload: TFaculty, password: string) => {
  const userData: Partial<Tuser> = {}

  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    userData.password = password || config.password
    userData.role = 'faculty'
    userData.id = await genaretedFacultyId()
    const result = await User.create([userData], { session })
    if (!result) {
      throw new AppError(403, 'user not created')
    }
    payload.id = result[0].id
    payload.user = result[0]._id

    const faculty = await Faculty.create([payload], { session })
    if (!faculty.length) {
      throw new AppError(403, 'faculty not created')
    }
    await session.commitTransaction()
    await session.endSession()
    return faculty
  } catch (error: any) {
    await session.abortTransaction()
    session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, error.message)
  }
}
export const userService = {
  createStudentIntoDD,
  createFacult,
}

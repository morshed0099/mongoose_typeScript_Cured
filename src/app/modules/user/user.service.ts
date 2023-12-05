import config from '../../config'
import AppError from '../../util/sendErrorwithCode'
import { TAcademic } from '../academic/academic.interface'
import { AcademicSmister } from '../academic/academic.module'
import { StudentModel } from '../studens/student.model'
import { Student } from '../studens/students.interface'
import { Tuser } from './user.interface'
import { User } from './user.model'
import { genaratedStudenId } from './user.util'
import httpStatus from 'http-status'
import mongoose from 'mongoose'

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


export const userCrontorler = {
  createStudentIntoDD,

}

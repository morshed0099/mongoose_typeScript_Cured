/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import AppError from '../../util/sendErrorwithCode'
import { StudentModel } from './student.model'
import mongoose from 'mongoose'
import { User } from '../user/user.model'
import { Student } from './students.interface'
import { QueryBuilder } from '../../queryBuilder/queryBuilder'

const getStudenIntoDb = async (query: Record<string, unknown>) => {
  console.log(query)
  // const queryObj = {
  //   ...query,
  // }

  // let serchTerm = ''
  // if (query?.serchTerm) {
  //   serchTerm = query.serchTerm as string
  // }
  const serchAbleFelid = ['email', 'name.firstName', 'presentAddress']

  // const serchQuery = StudentModel.find({
  //   $or:serchAbleFelid.map((fl) => ({
  //     [fl]: { $regex: serchTerm, $options: 'i' },
  //   })),
  // })

  // const excludeFeild = ['serchTerm', 'sort', 'page', 'limit', 'feilds']

  const studentQuery = new QueryBuilder(StudentModel.find(), query)
    .serchQuery(serchAbleFelid)
    .filterQuery()
    .sort()
    .paginate()
    .feild()

  const result = await studentQuery.queryMethod
  return result

  // excludeFeild.forEach((el) => delete queryObj[el])

  // const filterQuery = serchQuery.find(queryObj)

  // let sort = '-createdAt'
  // if (query.sort) {
  //   sort = query.sort as string
  // }

  // const sorQuery = filterQuery.sort(sort)

  // let limit = 1
  // let page = 1
  // let skip = 0

  // if (query.limit) {
  //   limit = Number(query.limit)
  // }
  // if (query.page) {
  //   page = Number(query.page)
  //   skip = (page - 1) * limit
  // }
  // const paginateQuery = sorQuery.skip(skip)
  // const limitQuery = paginateQuery.limit(limit)

  // let feilds = '-__V'
  // if (query.feilds) {
  //   feilds = (query.feilds as string).split(',').join(' ')
  // }
  // const filesFiltering = await limitQuery.select(feilds)

  // const serchAbleFields = ['email', 'name.firstName', 'presentAddress']
  // let serchTerm = ''
  // if (query?.serchTerm) {
  //   serchTerm = query?.serchTerm as string
  // }

  // const serchQuery = StudentModel.find({
  //   $or: serchAbleFields.map((feild) => ({
  //     [feild]: { $regex: serchTerm, $options: 'i' },
  //   })),
  // })

  //   const excludeFeilds = ['serchTerm','sort']
  //   excludeFeilds.forEach((el) => delete queryObj[el]);
  //   console.log(queryObj)

  //   const filterQuery =  serchQuery
  //     .find(queryObj)
  //     .populate('admissonSemister')
  //     .populate({
  //       path: 'academicDepartment',
  //       populate: {
  //         path: 'faculty',
  //       },
  //     })

  // let sort='-createdAt'
  // if(query?.sort){
  //   sort= query?.sort as string
  // }

  // const sortQuery= await filterQuery.sort(sort)
  //   return sortQuery
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

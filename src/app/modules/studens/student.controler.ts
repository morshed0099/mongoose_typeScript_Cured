import { Request, Response } from 'express'
import { StudentServices } from './student.service'
import { Student } from './students.interface'

const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body
    const result: Student = await StudentServices.createStudentIntoDD(student)
    res.status(200).json({
      succes: true,
      message: 'student created successfully',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}

const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getStudenIntoDb()
    res.status(200).json({
      success: true,
      message: 'all student data fetched ',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}
const getSigleStudent = async (req: Request, res: Response) => {
  try {
    const id = req.params.studentId
    const result = await StudentServices.getSingleStudenByID(id)
    res.status(200).json({
      success: true,
      message: 'studen fetch successfully',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}

export const StudentControler = {
  createStudent,
  getAllStudent,
  getSigleStudent,
}

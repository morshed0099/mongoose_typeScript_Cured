import httpStatus from 'http-status'
import { catchAsync } from '../../util/catchAsync'
import { userService } from './user.service'

const createStudent = catchAsync(async (req, res) => {
  const { student, password } = req.body
  const result = await userService.createStudentIntoDD(student, password)
  res.status(201).json({
    status: 'success',
    message: 'user created successfully !',
    data: result,
  })
})

const createFaculty = catchAsync(async (req, res) => {
  const facultyData = req.body
  const password = req.body.password
  const result = await userService.createFacult(facultyData, password)
  res.status(httpStatus.CREATED).json({
    success: true,
    message: 'faculty created successfully',
    data: result,
  })
})

export const userControler = {
  createStudent,
  createFaculty,
}

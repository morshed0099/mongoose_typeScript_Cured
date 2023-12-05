import { userCrontorler } from './user.service'
import { catchAsync } from '../../util/catchAsync'


const createStudent = catchAsync(async (req, res) => {
  const { student, password } = req.body
  const result = await userCrontorler.createStudentIntoDD(student, password)
  res.status(201).json({
    status: 'success',
    message: 'user created successfully !',
    data: result,
  })
})


export const userControler = {
  createStudent,
}

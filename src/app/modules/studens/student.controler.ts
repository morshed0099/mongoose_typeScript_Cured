
import { StudentServices } from './student.service'
import { catchAsync } from '../../util/catchAsync'


const getAllStudent = catchAsync(async (req, res) => {
  const result = await StudentServices.getStudenIntoDb()
  res.status(200).json({
    success: true,
    message: 'all student data fetched ',
    data: result,
  })
})

const getSigleStudent = catchAsync(async (req, res) => {
  const id = req.params.sutdentId
  const result = await StudentServices.getSingleStudenByID(id)
  res.status(200).json({
    success: true,
    message: 'studen fetch successfully',
    data: result,
  })
})

export const StudentControler = {
  getAllStudent,
  getSigleStudent,
}

import { StudentServices } from './student.service'
import { catchAsync } from '../../util/catchAsync'
import httpStatus from 'http-status'

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
const deleteStudent = catchAsync(async (req, res) => {
  const studentId = req.params.studentId
  const result = await StudentServices.deleteStudent(studentId)
  res.status(httpStatus.OK).json({
    success: true,
    message: 'student deleted successfully !!!',
    data: result,
  })
})

const updateStudent=catchAsync(async(req,res)=>{
 const id= req.params.studentId
 const studentData= req.body
 const result= await StudentServices.updateStudent(id,studentData)
 res.status(httpStatus.OK).json({
  success:true,
  message:"student updated successfully done !!",
  data:result
 })
})
export const StudentControler = {
  getAllStudent,
  getSigleStudent,
  deleteStudent,
  updateStudent
}

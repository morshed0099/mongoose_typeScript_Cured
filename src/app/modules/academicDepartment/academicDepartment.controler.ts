import httpStatus from 'http-status'
import { catchAsync } from '../../util/catchAsync'
import { academicDepartmentService } from './academicDepartment.service'

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result = await academicDepartmentService.createacademicDepartment(
    req.body,
  )
  res.status(httpStatus.OK).json({
    success: true,
    message: 'academic department created sucessfully',
    data: result,
  })
})

const getAllAcademicDeparment = catchAsync(async (req, res) => {
  const result = await academicDepartmentService.getAllAcademicDepartment()
  res.status(httpStatus.OK).json({
    success: true,
    message: 'all academic departmnet data terive sucessfully',
    data: result,
  })
})

const getSingleAcademicDeparment = catchAsync(async (req, res) => {
  const result = await academicDepartmentService.getSingeleAcademicDepartment(
    req.params.id,
  )
  res.status(httpStatus.OK).json({
    success: true,
    message: 'get single academic deparment data retive successfully ',
    data: result,
  })
})
const updateDeparmentAcademic = catchAsync(async (req, res) => {
  const result = await academicDepartmentService.updateAcademicDepartment(
    req.params.id,
    req.body,
  )
  res.status(httpStatus.OK).json({
    success: true,
    message: 'academic department data updated successfully done',
    data: result,
  })
})

export const academicDepartmentControler = {
  createAcademicDepartment,
  getAllAcademicDeparment,
  getSingleAcademicDeparment,
  updateDeparmentAcademic,
}

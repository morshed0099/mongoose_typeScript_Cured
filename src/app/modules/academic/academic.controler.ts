import httpStatus from 'http-status'
import { catchAsync } from '../../util/catchAsync'
import { academicSemisterService } from './academic.service'


const createAcademicSemister = catchAsync(async (req, res) => {
  const result = await academicSemisterService.createAcademicSemister(req.body)
  res.status(httpStatus.OK).json({
    success: true,
    message: 'academic semister created successfully !!',
    data: result,
  })
})

const getAllAcademicSemister = catchAsync(async (req, res) => {
  const result = await academicSemisterService.getAllAcademicSemister()
  res.status(httpStatus.OK).json({
    success: true,
    message: 'academic semister all retive !!',
    data: result,
  })
})

const getSingleAcademicSemister = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await academicSemisterService.getSingleAcademicSemister(id)
  if (!result) {
    throw new Error('data not found !!!')
  }
  res.status(httpStatus.OK).json({
    success: true,
    message: 'academic semister find successfully',
    data: result,
  })
})

const updateSingAcademicSemister = catchAsync(async (req, res) => {
  const id = req.params.id
  const data = req.body
  const result = await academicSemisterService.updateSingleAcademicSemister(
    id,
    data,
  )
  res.status(httpStatus.OK).json({
    success:true,
    message:'academic semister updated succesfully !',
    data:result
  })
})
export const academicSemisterControle = {
  createAcademicSemister,
  getAllAcademicSemister,
  getSingleAcademicSemister,
  updateSingAcademicSemister
}

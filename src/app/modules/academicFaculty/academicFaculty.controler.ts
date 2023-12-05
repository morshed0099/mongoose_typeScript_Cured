import httpStatus from 'http-status'
import { catchAsync } from '../../util/catchAsync'
import { academicFacultyService } from './academicFaculty.service'

const createAcademicFaculty = catchAsync(async (req, res) => {
  const academicFacultyData = req.body
  const result =
    await academicFacultyService.createAcademicFaculty(academicFacultyData)
  res.status(httpStatus.OK).json({
    success: true,
    message: 'academic faculty created successfully !!',
    data: result,
  })
})

const getAllAcademicFaculty = catchAsync(async (req, res) => {
  const result = await academicFacultyService.getAllAcademicFaculty()
  res.status(httpStatus.OK).json({
    success: true,
    message: 'academic faculty retive successfully !!',
    data: result,
  })
})

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await academicFacultyService.getSingleAcademicFaculty(id)
  res.status(httpStatus.OK).json({
    success: true,
    message: 'academic faculty retive successfully !!',
    data: result,
  })
})

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const id = req.params.id
  const academicData = req.body
  const result = await academicFacultyService.updateAcademicFaculty(
    id,
    academicData,
  )
  res.status(httpStatus.OK).json({
    succes: true,
    message: 'academic faculty updated successfully done',
    data: result,
  })
})

export const academicFacultyControler = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  updateAcademicFaculty,
  getSingleAcademicFaculty
}

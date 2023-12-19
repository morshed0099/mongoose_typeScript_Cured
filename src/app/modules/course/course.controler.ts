import httpStatus from 'http-status'
import { catchAsync } from '../../util/catchAsync'
import { couseService } from './course.service'

const createCouse = catchAsync(async (req, res) => {
  const courseData = req.body
  const result = await couseService.createCouse(courseData)
  res.status(httpStatus.OK).json({
    success: true,
    message: 'course created successfully !!',
    data: result,
  })
})

const getAllCouse = catchAsync(async (req, res) => {
  const result = await couseService.getAllCourse(req.query)
  res.status(httpStatus.OK).json({
    success: true,
    message: 'all course are retive successfully !!',
    data: result,
  })
})
const getSingleCouse = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await couseService.getSingleCouse(id)
  res.status(httpStatus.OK).json({
    success: true,
    message: 'course retive successfully !!',
    data: result,
  })
})

const updateCouse = catchAsync(async (req, res) => {
  const id = req.params.id
  const couseData = req.body
  const result = await couseService.updatedCouse(id, couseData)
  res.status(httpStatus.OK).json({
    success: true,
    message: 'course updated successFully',
    data: result,
  })
})
const deletedCouse = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await couseService.deletedCourse(id)
  res.status(httpStatus.OK).json({
    success: true,
    message: 'couse deleted successfully !!',
    data: result,
  })
})

const createCouseWithFaculty = catchAsync(async (req, res) => {
  const { courseId } = req.params
  const { faculties } = req.body
  const result = await couseService.createCouseWithFaculty(courseId, faculties)
  res.status(httpStatus.CREATED).json({
    success: true,
    message: 'couse faculty created successfully',
    data: result,
  })
})

const deleteCouseWithFaculty = catchAsync(async (req, res) => {
  const id = req.params.courseId
  const updaCouseFacultData = req.body
  const result = await couseService.deleteCouseWithFaculty(
    id,
    updaCouseFacultData,
  )
  res.status(httpStatus.OK).json({
    success: true,
    message: 'couse faculty deleted successfully',
    data: result,
  })
})
export const courseControler = {
  createCouse,
  getAllCouse,
  getSingleCouse,
  updateCouse,
  deletedCouse,
  createCouseWithFaculty,
  deleteCouseWithFaculty,
}

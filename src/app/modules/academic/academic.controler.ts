import { catchAsync } from '../../util/catchAsync'
import { AcademicSmister } from './academic.module'

const createAcademicSemister = catchAsync(async (req, res) => {
  const academicSemisterData = req.body
  const academicSemister = await AcademicSmister.create(academicSemisterData)
  res.status(200).json({
    success: true,
    message: 'academic semister created successfully !!',
    data: academicSemister,
  })
})

export const academicSemisterControle = {
  createAcademicSemister,
}

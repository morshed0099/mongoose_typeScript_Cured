import { TacademicDepartment } from './academicDepartment.interface'
import { AcademicDepartment } from './academicDepartment.model'

const createacademicDepartment = async (payload: TacademicDepartment) => {
  const result = (await AcademicDepartment.create(payload)).populate('academicFaculty')
  return result
}

const getAllAcademicDepartment = async () => {
  const result = await AcademicDepartment.find().populate('academicFaculty')
  return result
}

const getSingeleAcademicDepartment = async (id: string) => {
  const result = await AcademicDepartment.findById(id).populate('academicFaculty')
  return result
}

const updateAcademicDepartment = async (
  id: string,
  payload: TacademicDepartment,
) => {
  const result = await AcademicDepartment.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate('academicFaculty')
  return result
}

export const academicDepartmentService = {
  createacademicDepartment,
  getAllAcademicDepartment,
  getSingeleAcademicDepartment,
  updateAcademicDepartment,
}

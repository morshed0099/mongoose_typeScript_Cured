import { TacademicFaculty } from './academicFacult.interface'
import { AcademicFaculty } from './academicFaculty.model'

const createAcademicFaculty = async (payload: TacademicFaculty) => {
  const result = await AcademicFaculty.create(payload)
  return result
}

const getAllAcademicFaculty = async () => {
  const result = await AcademicFaculty.find()
  return result
}

const getSingleAcademicFaculty = async (id: string) => {
  const result = await AcademicFaculty.findById(id)
  return result
}

const updateAcademicFaculty = async (id: string, payload: TacademicFaculty) => {
  const result = await AcademicFaculty.findByIdAndUpdate(id, payload, {
    new: true,
  })
  return result
}

export const academicFacultyService = {
  createAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
  getAllAcademicFaculty,
}

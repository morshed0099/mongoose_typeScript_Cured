import { TAcademic } from './academic.interface'
import { AcademicSmister } from './academic.module'

const createAcademicSemister = async (payload: TAcademic) => {
  type AcademicSemisterNameWithCode = {
    [key: string]: string
  }

  const academicSemisterNameWithCode: AcademicSemisterNameWithCode = {
    Atumn: '01',
    Summar: '02',
    Fall: '03',
  }
  if (academicSemisterNameWithCode[payload.name] !== payload.code) {
    throw new Error('invalid code and name !!')
  }
  const result = AcademicSmister.create(payload)
  return result
}

const getAllAcademicSemister = async () => {
  const result = await AcademicSmister.find()
  return result
}

const getSingleAcademicSemister = async (academicSemisterId: string) => {
  const result = await AcademicSmister.findById(academicSemisterId)
  return result
}

const updateSingleAcademicSemister = async (id: string, payload: TAcademic) => {
  type AcademicSemisterNameWithCode = {
    [key: string]: string
  }

  const academicSemisterNameWithCode: AcademicSemisterNameWithCode = {
    Atumn: '01',
    Summar: '02',
    Fall: '03',
  }
  if (academicSemisterNameWithCode[payload.name] !== payload.code) {
    throw new Error('invalid code and name !!')
  }
  const result = await AcademicSmister.findByIdAndUpdate(id, payload, {
    new: true,
  })
  return result
}

export const academicSemisterService = {
  createAcademicSemister,
  getAllAcademicSemister,
  getSingleAcademicSemister,
  updateSingleAcademicSemister,
}

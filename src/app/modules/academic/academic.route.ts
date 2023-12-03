import express from 'express'
import { academicSemisterControle } from './academic.controler'
import { validate } from '../../midleware/validateRequest'
import { academicSemisterValidation } from './academicDataValidation'


const router = express.Router()


router.post(
  '/create-academic-semister',
  validate(academicSemisterValidation.createAcademicSemisterValidation),
  academicSemisterControle.createAcademicSemister,
)

export const academicSemisterRouter = router

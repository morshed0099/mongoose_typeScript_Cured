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
router.get('/', academicSemisterControle.getAllAcademicSemister)
router.get('/:id', academicSemisterControle.getSingleAcademicSemister)
router.patch('/:id', academicSemisterControle.updateSingAcademicSemister)

export const academicSemisterRouter = router

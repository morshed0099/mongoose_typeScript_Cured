import { Router } from 'express'
import { academicFacultyControler } from './academicFaculty.controler'
import { validate } from '../../midleware/validateRequest'
import { AcademicValidation } from './academicFaculty.validation'


const router = Router()

router.post(
  '/create-academic-faculty',
  validate(AcademicValidation.createAcademicValidatein),
  academicFacultyControler.createAcademicFaculty,
)
router.get('/', academicFacultyControler.getAllAcademicFaculty)
router.get('/:id', academicFacultyControler.getSingleAcademicFaculty)
router.patch('/:id', academicFacultyControler.updateAcademicFaculty)

export const academicFacultyRoute= router

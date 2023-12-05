import { Router } from 'express'
import { validate } from '../../midleware/validateRequest'
import { AcademicValidation } from '../academicFaculty/academicFaculty.validation'
import { academicDepartmentControler } from './academicDepartment.controler'

const router = Router()

router.post(
  '/create-academic-deparment',
  validate(AcademicValidation.createAcademicValidatein),
  academicDepartmentControler.createAcademicDepartment,
)
router.get('/', academicDepartmentControler.getAllAcademicDeparment)
router.get('/:id', academicDepartmentControler.getSingleAcademicDeparment)
router.patch('/:id', academicDepartmentControler.updateDeparmentAcademic)

export const academicDepartmentRoute = router

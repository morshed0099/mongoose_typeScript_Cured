import { Router } from 'express'
import { courseControler } from './course.controler'
import { validate } from '../../midleware/validateRequest'
import { courseValidation } from './couse.validate'

const router = Router()
router.post(
  '/create-course',
  validate(courseValidation.couseCreatedVlidate),
  courseControler.createCouse,
)
router.get('/', courseControler.getAllCouse)
router.get('/:id', courseControler.getSingleCouse)

router.put('/:courseId/assign-faculties',courseControler.createCouseWithFaculty);
router.patch('/:id', courseControler.updateCouse)
router.delete('/:courseId/remove-faculties',courseControler.deleteCouseWithFaculty);
router.delete('/:id', courseControler.deletedCouse)

export const couseRouter = router

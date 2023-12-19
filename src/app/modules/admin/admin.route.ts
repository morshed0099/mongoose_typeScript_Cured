import { Router } from 'express'
import { validate } from '../../midleware/validateRequest'
import { adminValidation } from './admin.validation'
import { adminControler } from './admin.conteroler'

const router = Router()
router.post(
  '/create-admin',
  validate(adminValidation.createAdminValidation),
  adminControler.createAdmin,
)
router.get('/:id', adminControler.getAdminById)
router.delete('/:id', adminControler.deleteAdmin)
router.patch('/:id', adminControler.updateAdmin)

export const adminRouter = router

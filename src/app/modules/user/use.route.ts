import express from 'express'
import { userControler } from './user.controler'

import studentSchemaValid from '../studens/dataVlidWithJoi'
import { validate } from '../../midleware/validateRequest'

const router = express.Router()

router.post(
  '/create-student',
  validate(studentSchemaValid),
  userControler.createStudent,
)

export const userRouter = router

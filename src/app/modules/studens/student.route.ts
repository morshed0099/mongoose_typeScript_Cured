import express from 'express'
import { StudentControler } from './student.controler'

const router = express.Router()

// will call controler function

router.get('/', StudentControler.getAllStudent)
router.get('/:sutdentId', StudentControler.getSigleStudent)

export const StudentRoute = router

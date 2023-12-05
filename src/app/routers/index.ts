import { Router } from 'express'
import { StudentRoute } from '../modules/studens/student.route'
import { userRouter } from '../modules/user/use.route'
import { academicSemisterRouter } from '../modules/academic/academic.route'
import { academicFacultyRoute } from '../modules/academicFaculty/academicFaculty.route'
import { academicDepartmentRoute } from '../modules/academicDepartment/academicDeparment.route'

const router = Router()

router.use('/student', StudentRoute)
router.use('/users', userRouter)

const moduleRouter = [
  {
    path: '/student',
    route: StudentRoute,
  },
  {
    path: '/users',
    route: userRouter,
  },
  {
    path: '/academic-semister',
    route: academicSemisterRouter,
  },
  {
    path: '/academic-faculties',
    route: academicFacultyRoute,
  },
  {
    path: '/academic-departments',
    route: academicDepartmentRoute,
  },
]
moduleRouter.forEach((route) => router.use(route.path, route.route))

export default router

import { Router } from 'express'
import { StudentRoute } from '../modules/studens/student.route'
import { userRouter } from '../modules/user/use.route'

const router = Router()

router.use('/student', StudentRoute)
router.use('/users', userRouter)

const moduleRouter=[
    {
        path:'/student',
        route:StudentRoute
    },
    {
        path:'/users',
        route:userRouter
    }
]
moduleRouter.forEach(route=>(router.use(route.path,route.route)))

export default router

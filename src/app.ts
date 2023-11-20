import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { StudentRoute } from './app/modules/studens/student.route'

const app: Application = express()
// const port = 3000

// perser
app.use(express.urlencoded({ extended: true }))

app.use(express.json())
app.use(cors())
// application route

app.use('/api/v1/student', StudentRoute)

app.get('/', (req: Request, res: Response) => {
  const a = 10
  res.send(a)
})

export default app

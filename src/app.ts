import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandeler from './app/midleware/globalerrorhandeler'
import notFound from './app/midleware/notFound'
import router from './app/routers'

const app: Application = express()
// const port = 3000

// perser
app.use(express.urlencoded({ extended: true }))

app.use(express.json())
app.use(cors())
// application route

app.use('/api/v1',router)

app.get('/', (req: Request, res: Response) => {
  const a = 10
  res.send(a)
})

app.use(globalErrorHandeler)
app.use(notFound)
export default app







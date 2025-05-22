import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { studentRoutes } from './app/Modules/students/student.route'
import { UserRoutes } from './app/Modules/user/user.route'
import { GlobalErrorHandler } from './app/middleware/globalErrorHandler'
import notFound from './app/middleware/notFound'
const app : Application = express()


// parser
app.use(express.json())
app.use(cors())

// application routes
app.use('/api/v1/students', studentRoutes)
app.use('/api/v1/users', UserRoutes)

app.get('/', (req : Request, res : Response) => {
  res.send('Hello World!')
})


app.use(GlobalErrorHandler)

// not found route
app.use(notFound)

export default app;


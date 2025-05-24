import express, { Application, Request, Response } from 'express'
import cors from 'cors'

import { UserRoutes } from './app/Modules/user/user.route'
import { GlobalErrorHandler } from './app/middleware/globalErrorHandler'
import notFound from './app/middleware/notFound'
import router from './app/routes'
const app : Application = express()


// parser
app.use(express.json())
app.use(cors())

// application routes
app.use('/api/v1', router)
app.use('/api/v1/users', UserRoutes)

app.get('/', (req : Request, res : Response) => {
  res.send('Hello World!')
})


app.use(GlobalErrorHandler)

// not found route
app.use(notFound)

export default app;


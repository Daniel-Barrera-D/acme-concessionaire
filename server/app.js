import express from 'express'
import morgan from 'morgan'
import fileUpload from 'express-fileupload'
import cookieParser from 'cookie-parser'
import authUserRoutes from './routes/auth.routes.js'
import clientsRoutes from './routes/clients.routes.js'
import carRoutes from './routes/car.routes.js'

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './upload'
}))

app.use('/api', authUserRoutes)
app.use('/api/', clientsRoutes)
app.use('/api', carRoutes)

export default app
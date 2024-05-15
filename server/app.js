import express from 'express'
import morgan from 'morgan'
import fileUpload from 'express-fileupload'
import authUserRoutes from './routes/auth.routes.js'

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './upload'
}))

app.use('/api', authUserRoutes)

export default app
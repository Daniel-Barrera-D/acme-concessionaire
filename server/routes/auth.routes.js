import { Router } from "express"
import { registerUser, loginUser } from '../controllers/authUser.controller.js'
import { validateSchema } from "../middlewares/validator.middleware.js"
import { registerSchema } from "../schemas/user.schema.js"

const router = Router()

router.post('/register-user', validateSchema(registerSchema), registerUser)

router.post('/login-user', loginUser)

export default router
import { Router } from "express"
import { registerUser, loginUser, logout, profile } from '../controllers/authUser.controller.js'
import { validateSchema } from "../middlewares/validator.middleware.js"
import { loginSchema, registerSchema } from "../schemas/user.schema.js"
import { authRequired } from "../middlewares/validateToken.js"

const router = Router()

router.post('/register-user', validateSchema(registerSchema), registerUser)

router.post('/login', validateSchema(loginSchema),loginUser)

router.post('/logout', logout)

router.get('/profile', authRequired, profile)

export default router
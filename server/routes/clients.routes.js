import { Router } from "express"
import { registerClient } from "../controllers/client.controller.js"
import { authRequired } from "../middlewares/validateToken.js"
import { validateSchema } from "../middlewares/validator.middleware.js"
import { registerClientSchema } from "../schemas/client.schema.js"

const router = Router()

router.post('/register-client', authRequired, validateSchema(registerClientSchema) ,registerClient)

export default router
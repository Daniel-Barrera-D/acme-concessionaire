import { Router } from "express"
import { deleteCar, getCar, getCars, registerCar, updateStatusCar } from "../controllers/car.controller.js"
import { validateSchemaCar } from "../middlewares/validator.middleware.js"
import { registerCarSchema } from "../schemas/car.schema.js"

const router = Router()

router.post('/register-car', validateSchemaCar(registerCarSchema), registerCar)
router.get('/cars', getCars)
router.get('/car/:numberPlate', getCar)
router.put('/car/:numberPlate', updateStatusCar)
router.delete('/car/:numberPlate', deleteCar)

export default router
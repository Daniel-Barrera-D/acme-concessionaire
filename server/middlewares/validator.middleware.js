import fs from 'fs-extra'
import { deleteUploads } from '../controllers/car.controller.js'
export const validateSchema = (schema) => async (req, res, next) => { 
    try {
        schema.parse(req.body)
        next()
    } catch (error) {
        if(req.files) await fs.remove(req.files.profileImage.tempFilePath)
        return res.status(400).json({ error: error.errors.map(error => error.message) })
    }
}

export const validateSchemaCar = (schema) => async (req, res, next) => {

    let carImages = req.files?.carImages
    if(!Array.isArray(carImages)) carImages = [carImages]

    try {
        schema.parse(req.body)
        next()
    } catch (error) {
        deleteUploads(carImages)
        return res.status(400).json({ error: error.errors.map(error => error.message) })
    }
} 
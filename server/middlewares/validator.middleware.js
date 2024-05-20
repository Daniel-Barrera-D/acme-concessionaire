import fs from 'fs-extra'
export const validateSchema = (schema) => async (req, res, next) => { 
    try {
        schema.parse(req.body)
        next()
    } catch (error) {
        if(req.files) await fs.remove(req.files.profileImage.tempFilePath)
        return res.status(400).json({ error: error.errors.map(error => error.message) })
    }
}
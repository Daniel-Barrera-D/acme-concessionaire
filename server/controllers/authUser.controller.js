import User from '../models/user.model.js'
import { uploadProfileImage } from '../libs/cloudinary.js'
import fs from 'fs-extra'

export const registerUser = async (req, res) => {

    try {

        const { dni, name, lastname, email, password } = req.body

        let profileImage = null

        if (req.files?.profileImage) {
            const result = await uploadProfileImage(req.files.profileImage.tempFilePath)
            await fs.remove(req.files.profileImage.tempFilePath)
            profileImage = {
                url: result.secure_url,
                public_id: result.public_id
            }
        }

        const newUser = new User({
            dni,
            name,
            lastname,
            email,
            password,
            profileImage
        })
        const userSaved = await newUser.save()
        return res.json(userSaved)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
    
}

export const loginUser = (req, res) => res.send('Login User')
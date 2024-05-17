import User from '../models/user.model.js'
import { uploadProfileImage } from '../libs/cloudinary.js'
import fs from 'fs-extra'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'

export const registerUser = async (req, res) => {

    const { dni, name, lastname, email, password } = req.body

    try {

        let profileImage = null
        const passwordHash = await bcrypt.hash(password, 10)

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
            password: passwordHash,
            profileImage
        })

        const userSaved = await newUser.save()
        const token = await createAccessToken({ id: userSaved._id })

        res.cookie('token', token)

        return res.json({
            dni: userSaved.dni,
            name: userSaved.name,
            email: userSaved.email,
            profileImage: userSaved.profileImage,
        })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    
}

export const loginUser = (req, res) => res.send('Login User')
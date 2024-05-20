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

export const loginUser = async (req, res) => {

    const { email, password } = req.body

    try {

        const userFound = await User.findOne({ email })

        if(!userFound) return res.status(400).json({ message: "User not found" })
        
        const isMatch = await bcrypt.compare(password, userFound.password)

        if(!isMatch) return res.status(400).json({ message: "Incorrect password" })
        
        const token = await createAccessToken({ id: userFound._id })

        res.cookie('token', token, { secure: false, sameSite: 'none' })
        
        res.json({
            dni: userFound.dni,
            name: userFound.name,
            lastname: userFound.lastname,
            email: userFound.email,
            profileImage: userFound.profileImage,
        })
        
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const logout = (req, res) => {
    res.cookie('token', '', {
        expires: new Date(0)
    })
    return res.sendStatus(200)
}

export const profile = async (req, res) => {

    try {
        
        const userFound = await User.findById(req.user.id)
    
        return res.json({
            dni: userFound.dni,
            name: userFound.name,
            lastname: userFound.lastname,
            email: userFound.email,
            profileImage: userFound.profileImage,
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    
}
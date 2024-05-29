import { v2 as cloudinary } from 'cloudinary'
import { API_KEY, API_SECRET, CLOUD_NAME } from '../config.js'

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET
})

export const uploadProfileImage = async filePath => {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'acme/profileImages'
    })
}

export const uploadCarImages = async filePath => {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'acme/carImages'
    })
}
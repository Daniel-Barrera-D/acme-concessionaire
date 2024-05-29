import { uploadCarImages } from '../libs/cloudinary.js'
import fs from 'fs-extra'
import Car from '../models/car.model.js'
import Client from '../models/client.model.js'

export const deletedUploads = async (carImages) => {
    if(carImages[0] !== undefined){
        for(const carImage of carImages){
            await fs.remove(carImage.tempFilePath)
        }
    }
}

export const registerCar = async (req, res) => {

    try {
        const { numberPlate, make, model, salePrice, dniOwner } = req.body

        const clientFound = await Client.findOne({ dni: dniOwner })

        let maxSize = 1 * 1024 * 1024

        let carImages = req.files?.carImages

        if(!Array.isArray(carImages)) carImages = [carImages]

        const uploadResults = []

        if(!clientFound) {
            deletedUploads(carImages)
            return res.status(404).json({ message: "Client not found, please register"})
        }

        const carFound = await Car.findOne({ numberPlate })

        if(carFound) {
            deletedUploads(carImages)
            return res.status(400).json({ message: "The car is already registered in the system"})
        }

        if(carImages[0] === undefined) return res.status(404).json({ message: "You must upload at least one image"})

        for(const carImage of carImages) {
            if(carImage.size > maxSize) {
                deletedUploads(carImages)
                return res.status(400).json({ message: "The image exceeds the allowed size (5 MB)"})
            }
            
        }

        for(const carImage of carImages) {
            const result = await uploadCarImages(carImage.tempFilePath)
            await fs.remove(carImage.tempFilePath)
            uploadResults.push({url: result.url, public_id: result.public_id})
        }

        const newCar = new Car({
            numberPlate,
            make,
            model,
            salePrice,
            owner: clientFound._id,
            carImages: uploadResults
        })

        const savedCar = await newCar.save()

        res.json({
            numberPlate: savedCar.numberPlate,
            make: savedCar.make,
            model: savedCar.model,
            salePrice: savedCar.salePrice,
            status: savedCar.status,
            owner: {
                dni: clientFound.dni,
                name: clientFound.name,
                lastname: clientFound.lastname
            },
            carImages: uploadResults
        })
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getCars = async(req, res) => {

    try {

        const cars = await Car.find().populate('owner', 'dni name lastname -_id')
        const dataDisplay = cars.map(car => ({
            numberPlate: car.numberPlate,
            make: car.make,
            model: car.model,
            salePrice: car.salePrice,
            status: car.status,
            owner: car.owner,
            carImages: car.carImages,
            publicationDate: car.updatedAt
        }))

        res.json(dataDisplay)
        
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" })
    }
}

export const getCar = async(req, res) => {

    const { numberPlate } = req.params

    try {

        const car = await Car.findOne( { numberPlate } ).populate('owner', 'dni name lastname -_id')

        if(!car) return res.status(400).json({ message: "Car not found"})

        res.json({
            numberPlate: car.numberPlate,
            make: car.make,
            model: car.model,
            salePrice: car.salePrice,
            status: car.status,
            owner: car.owner,
            carImages: car.carImages,
            publicationDate: car.updatedAt
        })
        
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" })
    }
}

export const updateStatusCar = async(req, res) => {

    const { numberPlate } = req.params

    try {

        req.body.status = 'En venta'
        
        const car = await Car.findOneAndUpdate({ numberPlate }, req.body, {
            new: true
        }).populate('owner', 'dni name lastname -_id')

        if(!car) return res.status(404).json({ message: "Car not found"})
        
        res.json({
            numberPlate: car.numberPlate,
            make: car.make,
            model: car.model,
            salePrice: car.salePrice,
            status: car.status,
            owner: car.owner,
            publicationDate: car.updatedAt
        })

    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}
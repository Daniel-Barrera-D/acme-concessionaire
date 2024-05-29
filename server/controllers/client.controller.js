import Client from '../models/client.model.js'

export const registerClient = async (req, res) => {

    const { dni, name, lastname } = req.body

    try {

        const clientFound = await Client.findOne({ dni })

        if(clientFound) return res.status(400).json({ message: "The client is already registered in the system"})
        
        const newClient = new Client({
            dni,
            name,
            lastname
        })

        await newClient.save()

        return res.status(200).json({ message: "Client created successfully"})

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
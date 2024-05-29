import mongoose from "mongoose"

const carSchema = new mongoose.Schema({
    numberPlate: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    make: {
        type: String,
        required: true,
        trim: true,
    },
    model: {
        type: String,
        required: true,
        trim: true,
    },
    salePrice: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        default: 'En revisión'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    carImages: [{
        url: String,
        public_id: String,
    }]
}, {
    timestamps: true
})

export default mongoose.model('Car', carSchema)
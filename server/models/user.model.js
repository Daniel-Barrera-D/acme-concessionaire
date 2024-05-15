import mongoose from "mongoose"

const userSchema = new mongoose.Schema({ 
    dni: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: {
        url: String,
        public_id: String,
    }
})

export default mongoose.model('User', userSchema)
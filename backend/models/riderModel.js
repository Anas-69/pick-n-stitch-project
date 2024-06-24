// create user model with these fields: username, email, password, role, location and cnic

const mongoose = require('mongoose')
const riderSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    cnic: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    license: {
        type: String,
        required: true
    }
})

const Rider = mongoose.model('Rider', riderSchema)
module.exports = Rider;
// create user model with these fields: username, email, password, role, location and cnic

const mongoose = require('mongoose')
const tailorSchema = new mongoose.Schema({
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
})

const Tailor = mongoose.model('Tailor', tailorSchema)
module.exports = Tailor;
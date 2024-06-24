// create user model with these fields: username, email, password, role, location and cnic

const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
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
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User;
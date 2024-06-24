// create order schema with these fields: productName, productDescription, productPrice, riderName, orderTime, orderDate, startDestination, endDestination, orderStatus 
const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    productPrice: {
        type: String,
        required: true
    },
    riderName: {
        type: String,
        required: true
    },
    orderTime: {
        type: String,
        required: true
    },
    orderDate: {
        type: String,
        required: true
    },
    startDestination: {
        type: String,
        required: true
    },
    endDestination: {
        type: String,
        required: true
    },
    orderStatus: {
        type: String,
        required: true,
        default: 'Pending',
        enum: ['Pending', 'Ordered', 'Delivered']
    }
})


const Order = mongoose.model('Order', orderSchema)
module.exports = Order;
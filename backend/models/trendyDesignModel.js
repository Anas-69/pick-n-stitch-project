const mongoose = require('mongoose')
const trendyDesignSchema = new mongoose.Schema({
    productImage: {
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
    tailorName: {
        type: String,
        required: true
    }
})

const TrendyDesign = mongoose.model('TrendyDesign', trendyDesignSchema)
module.exports = TrendyDesign;
const express = require('express');
const router = express.Router();
const TrendyDesign = require('../models/trendyDesignModel');
const multer = require('multer');
const path = require('path');


// Cloudinary configuration
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'duv8beveo',
    api_key: '645289865995663',
    api_secret: 'jpcm0Ci7nSbKL_gDttIzSJSNORo'
});


// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({ storage });

// Create a new trendy design
router.post('/create', upload.single('productImage'), async (req, res) => {
    try {
        const { productName, productDescription, productPrice, tailorName } = req.body;

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            const productImageUrl = result.secure_url;
            const trendyDesign = new TrendyDesign({
                productName,
                productDescription,
                productPrice,
                productImage: productImageUrl,
                tailorName,
            });

            const newTrendyDesign = await trendyDesign.save();
            res.status(201).json(newTrendyDesign);
        } else {
            res.status(400).json({ error: 'Image not uploaded' });
        }
    } catch (error) {
        console.error('Error creating trendy design:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all trendy designs
router.get('/', async (req, res) => {
    try {
        const allTrendyDesigns = await TrendyDesign.find();
        res.status(200).json(allTrendyDesigns);
    } catch (error) {
        console.error('Error fetching trendy designs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;

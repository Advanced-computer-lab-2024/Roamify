const mongoose = require('mongoose');
const HistoricalTag = require('../models/historicalTag.js'); // Ensure this path is correct

const createHistoricalTag = async (req, res) => {
    try {
        const { type, Period } = req.query; // If you are using query parameters
        const newTag = new HistoricalTag({
            Type: type,
            Period
        });

        await newTag.save();

        res.status(201).json({
            message: 'Historical tag created successfully!',
            data: newTag
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating historical tag',
            error: error.message
        });
    }
};

// Export the function to make sure it's accessible
module.exports = { createHistoricalTag };

const mongoose = require("mongoose");

const exchangeRateSchema = new mongoose.Schema({
    currency: { type: String, required: true, unique: true },
    rate: { type: Number, required: true },
    symbol: { type: String, required: true }, // Add symbol field to store the currency symbol
    lastUpdated: { type: Date, default: Date.now }
});

const ExchangeRate = mongoose.model("exchange rate", exchangeRateSchema);

module.exports = ExchangeRate;

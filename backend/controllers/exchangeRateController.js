const exchangeRateModel = require("../models/exchangeRateModel");

const fetchAllExchangeRates = async (req, res) => {
    try {
        // Fetch all records from the exchange rate collection
        const exchangeRates = await exchangeRateModel.find().select("currency rate symbol -_id");

        // Format the response with currency, rate, and symbol (fallback to currency code if symbol is missing)
        const formattedRates = exchangeRates.map(rate => ({
            currency: rate.currency,
            value: rate.rate,
            symbol: rate.symbol || rate.currency
        }));

        res.status(200).json({
            message: "Exchange rates retrieved successfully",
            exchangeRates: formattedRates
        });
    } catch {
        res.status(500).json({ message: "Could not fetch exchange rates. Please try again later." });
    }
};

module.exports = { fetchAllExchangeRates };

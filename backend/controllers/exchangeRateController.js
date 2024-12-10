const exchangeRateModel = require("../models/exchangeRateModel");

const fetchAllExchangeRates = async (req, res) => {
    try {
        // Fetch all records from the exchange rate collection
        const exchangeRates = await exchangeRateModel
            .find()
            .select("currency rate symbol -_id");

        if (!exchangeRates || exchangeRates.length === 0) {
            return res
                .status(404)
                .json({ message: "No exchange rates found in the system." });
        }

        // Format the response with currency, rate, and symbol (fallback to currency code if symbol is missing)
        const formattedRates = exchangeRates.map((rate) => ({
            currency: rate.currency,
            value: rate.rate,
            symbol: rate.symbol || rate.currency,
        }));

        res.status(200).json({
            message: "Exchange rates retrieved successfully.",
            exchangeRates: formattedRates,
        });
    } catch (error) {
        console.error("Error fetching exchange rates:", error);
        res
            .status(500)
            .json({
                message: "An error occurred while fetching exchange rates. Please try again later.",
                error: error.message,
            });
    }
};

module.exports = { fetchAllExchangeRates };

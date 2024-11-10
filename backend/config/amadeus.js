// services/amadeusService.js
const Amadeus = require('amadeus');
require('dotenv').config(); // Load environment variables

const amadeus = new Amadeus({
    clientId: process.env.AMADEUS_CLIENT_ID,
    clientSecret: process.env.AMADEUS_CLIENT_SECRET,
});

module.exports = amadeus;

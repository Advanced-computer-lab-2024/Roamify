// services/amadeusService.js
const Amadeus = require('amadeus');
require('dotenv').config(); // Load environment variables

const amadeus = new Amadeus({
    clientId: "M4woZnjQpVJlMKPfjXc8rzYBIm1puX28",
    clientSecret: "6zVI1xbyTD6n5MgD",
    logLevel: 'debug' // Enables detailed debugging information
});

module.exports = amadeus;

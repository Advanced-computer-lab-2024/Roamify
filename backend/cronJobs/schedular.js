const cron = require("node-cron");
const { updatePoints, setLevel } = require("./pointsUpdater");
const fetchAndUpdateExchangeRates = require("./fetchAndUpdateExchangeRates");

module.exports = () => {
    updatePoints();
    setLevel();
    fetchAndUpdateExchangeRates();
};

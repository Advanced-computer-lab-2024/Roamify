const cron = require("node-cron");
const { updatePoints, setLevel } = require("./pointsUpdater");
const fetchAndUpdateExchangeRates = require("./fetchAndUpdateExchangeRates");

module.exports = () => {
  // Run all tasks daily at 12:00 AM
  cron.schedule(
    "0 0 * * *",
    async () => {
      console.log("Running scheduled tasks at 12:00 AM...");
      // Run each task
      await updatePoints();
      await setLevel();
      await fetchAndUpdateExchangeRates();
    },
    {
      timezone: "Africa/Cairo",
    }
  );
};

const cron = require("node-cron");
const { updatePoints, setLevel } = require("./pointsUpdater");
const fetchAndUpdateExchangeRates = require("./fetchAndUpdateExchangeRates");
const emailAndNotifyUser = require("./notifyUsers");

module.exports = () => {
  // Run all tasks daily at 12:00 AM
  cron.schedule(
    "30 22 * * *",
    async () => {
      console.log("Running scheduled tasks at 12:00 AM...");
      // Run each task
      // await updatePoints();
      // await setLevel();
      // await fetchAndUpdateExchangeRates();
      await emailAndNotifyUser();
    },
    {
      timezone: "Africa/Cairo",
    }
  );
};

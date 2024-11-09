const express = require("express");
const connectDB = require("./config/db");
const { PORT } = require("./config/constants");
const applyMiddleware = require("./config/middleware");
const routes = require("./routes");
const scheduledJobs = require("./cronJobs/schedular");
const { authenticate } = require("./middleware/authMiddleware");

const app = express();

// Connect to database
connectDB();

// Apply middleware
applyMiddleware(app);

// Scheduled jobs(Points,Exchange rates,...etc)
scheduledJobs();

// Mount routes with role-based authentication if applicable
routes.forEach(({ path, route, role }) => {
    if (role) {
        app.use(path, authenticate(role), route);
    } else {
        app.use(path, route);
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

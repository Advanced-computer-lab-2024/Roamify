// Load environment variables from .env
require("dotenv").config();

// Import modules
const express = require("express");
const connectDB = require("./config/db");                 // Database connection
const setupMiddlewares = require("./config/middleware"); // General middlewares (CORS, cookieParser, etc.)
const setupRoutes = require("./config/setupRoutes");      // API route setup with role-based checks
const setupCronJobs = require("./cronJobs/cronScheduler"); // Cron job scheduler

// Initialize app
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the database
connectDB();

// Setup middlewares (e.g., CORS, cookie parsing, JSON parsing)
setupMiddlewares(app);

// Setup API routes with role-based authentication
setupRoutes(app);

// Initialize cron jobs (scheduled tasks)
setupCronJobs();

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});

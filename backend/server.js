// Load environment variables from .env
require("dotenv").config();

// Import modules
const express = require("express");
const http = require("http"); // Import HTTP module for server creation
const { Server } = require("socket.io"); // Import Socket.IO
const connectDB = require("./config/db"); // Database connection
const setupMiddlewares = require("./config/middleware"); // General middlewares (CORS, cookieParser, etc.)
const setupRoutes = require("./config/setupRoutes"); // API route setup with role-based checks
const setupCronJobs = require("./cronJobs/cronScheduler"); // Cron job scheduler
const { setupSocketIO } = require("./config/socket"); // Import Socket.IO setup

// Initialize app
const app = express();
const PORT = process.env.PORT || 3000;

// Create an HTTP server
const server = http.createServer(app); // Combine Express with an HTTP server

// Initialize Socket.IO
setupSocketIO(server, app); // Pass server and app to the Socket.IO setup

// Connect to the database
connectDB();

// Setup middlewares (e.g., CORS, cookie parsing, JSON parsing)
setupMiddlewares(app);

// Setup API routes with role-based authentication
setupRoutes(app);

// Initialize cron jobs (scheduled tasks)
setupCronJobs();



// Start the HTTP server
server.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});

require("dotenv").config(); // Load environment variables
const express = require("express");
const http = require("http");
const connectDB = require("./config/db");
const setupMiddlewares = require("./config/middleware");
const setupRoutes = require("./config/setupRoutes");
const setupSocketIO = require("./config/socket").setupSocketIO;
const { agenda, startupRecovery } = require("./config/agenda");
const PORT = process.env.PORT || 3000; // Use PORT from environment variables or default to 3000

// Initialize the app
const app = express();
const server = http.createServer(app); // HTTP server

(async () => {
  try {
    // Connect to the database
    await connectDB();
    console.log("✅ Connected to the database");

    // Start Agenda
    await agenda.start();
    console.log("✅ Agenda started");

    // Perform recovery tasks
    await startupRecovery();
    console.log("✅ Startup recovery completed");

    // Setup middlewares
    setupMiddlewares(app);

    // Setup API routes
    setupRoutes(app);

    // Initialize Socket.IO
    setupSocketIO(server, app);

    // Start the server
    server.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error during server startup:", error.message);
    process.exit(1); // Exit the process if initialization fails
  }
})();

// Graceful shutdown for Agenda
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully...");
  await agenda.stop();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("SIGINT received, shutting down gracefully...");
  await agenda.stop();
  process.exit(0);
});

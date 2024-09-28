const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
//const userRoutes = require('./routes/etc');
//const cors = require('cors');    //  --> For if the Backend and the Frontend are hosted on different domains.

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());  // For parsing JSON bodies
//app.use(cors());          // Enable CORS

// Routes
//app.use('/api/users', userRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

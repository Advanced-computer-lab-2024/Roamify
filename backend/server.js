const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const businessUserRoutes = require('./routes/businessUserRoutes');
const advertiserRoutes = require('./routes/advertiserRoutes');
const tourGuideRoutes = require('./routes/tourGuideRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
//const userRoutes = require('./routes/etc');
//const cors = require('cors');    //  --> For if the Backend and the Frontend are hosted on different domains.

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());  // For parsing JSON bodies
app.use(express.urlencoded({ extended: true }));
//app.use(cors());   

// Enable CORS



// Routes
//app.use('/api/users', userRoutes);
app.use( '/businessuser',businessUserRoutes);
app.use('/advertiser',advertiserRoutes);
app.use('/tourguide',tourGuideRoutes);
app.use('/seller',sellerRoutes);

// Start the servercreateBusinessUser
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

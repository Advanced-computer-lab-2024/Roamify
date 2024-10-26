const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authenticate = require("./middleware/authMiddleware");

// Route Imports
const userRoutes = require("./routes/userRoutes");
const touristRoutes = require("./routes/touristRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");
const tourGuideRoutes = require("./routes/tourGuideRoutes");
const advertiserRoutes = require("./routes/advertiserRoutes");
const sellerRoutes = require("./routes/sellerRoutes");
const tourismGovernorRoutes = require("./routes/tourismGovernorRoutes");
const historicalTagRoutes = require("./routes/historicalTagRoutes");

// Initialize app
const app = express();
const PORT = process.env.PORT || 3000;

// Database connection
connectDB();

// Middleware
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/tourist", authenticate.authenticateTourist, touristRoutes);
app.use("/api/tourguide", authenticate.authenticateTourGuide, tourGuideRoutes);
app.use("/api/advertiser", authenticate.authenticateAdvertiser, advertiserRoutes);
app.use("/api/seller", authenticate.authenticateSeller, sellerRoutes);
app.use("/api/tourismgovernor", authenticate.authenticateTourismGovernor, tourismGovernorRoutes);
app.use("/api/admin", authenticate.authenticateAdmin,adminRoutes);
app.use("/historical-tag", historicalTagRoutes);
app.use("/product", productRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

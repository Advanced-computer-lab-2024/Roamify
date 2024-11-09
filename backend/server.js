const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const { authenticate } = require("./middleware/authMiddleware");
const { updatePoints, setLevel } = require("./jobs/pointsUpdater"); // Import the job

// Route Imports
const userRoutes = require("./routes/userRoutes");
const touristRoutes = require("./routes/touristRoutes");
const adminRoutes = require("./routes/adminRoutes");
const tourGuideRoutes = require("./routes/tourGuideRoutes");
const advertiserRoutes = require("./routes/advertiserRoutes");
const sellerRoutes = require("./routes/sellerRoutes");
const tourismGovernorRoutes = require("./routes/tourismGovernorRoutes");
const productRoutes = require("./routes/productRoutes");
const itineraryRoutes = require("./routes/itineraryRoutes");
const activityRoutes = require("./routes/activityRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const historicalTagRoutes = require("./routes/historicalTagRoutes");
const preferenceTagRoutes = require("./routes/preferenceTagRoutes");
const placesRoutes = require("./routes/placesRoutes");
const cartRoutes = require("./routes/cartRoute");
const complaintRoutes = require("./routes/complaintRoutes");
// Initialize app
const app = express();
const PORT = 3000;
// Database connections
connectDB();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

//job
updatePoints(); // Start the cron job
setLevel();
//routes

app.use("/api/user", userRoutes);
app.use("/api/tourist", authenticate(["tourist"]), touristRoutes);
app.use("/api/tourguide", authenticate(["tourGuide"]), tourGuideRoutes);
app.use("/api/advertiser", authenticate(["advertiser"]), advertiserRoutes);
app.use("/api/seller", authenticate(["seller"]), sellerRoutes);
app.use(
  "/api/tourismgovernor",
  authenticate(["tourismGovernor"]),
  tourismGovernorRoutes
);
app.use("/api/admin", authenticate(["admin"]), adminRoutes);
app.use("/api/product", productRoutes);
app.use("/api/itinerary", itineraryRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/preference-tag", preferenceTagRoutes);
app.use("/api/historical-tag", historicalTagRoutes);
app.use("/api/places", placesRoutes);
app.use("/api/cart", authenticate(["tourist"]), cartRoutes);
app.use("/api/complaint", complaintRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

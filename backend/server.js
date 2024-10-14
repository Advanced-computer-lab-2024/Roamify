const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const touristRoutes = require("./routes/touristRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");
const tourGuideRoutes = require("./routes/tourGuideRoutes");
const advertiserRoutes = require("./routes/advertiserRoutes");
const sellerRoutes = require("./routes/sellerRoutes");
const tourismGovernerRoutes = require("./routes/tourismGovernorRoutes");
const historicalTagRoutes = require("./routes/historicalTagRoutes");
dotenv.config();
connectDB();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/tourist", touristRoutes);
app.use("/admin", adminRoutes);
app.use("/product", productRoutes);
app.use("/tourguide", tourGuideRoutes);
app.use("/advertiser", advertiserRoutes);
app.use("/seller", sellerRoutes);
app.use("/tourismgoverner", tourismGovernerRoutes);
app.use("/historical-tag", historicalTagRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

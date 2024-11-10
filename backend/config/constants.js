    const dotenv = require("dotenv");
    dotenv.config();

    module.exports = {
      PORT: process.env.PORT || 3000,
      DB_URI: process.env.DB_URI,
      CORS_ORIGIN: "http://localhost:5173",
    };

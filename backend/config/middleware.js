const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const { CORS_ORIGIN } = require("./constants");

module.exports = (app) => {
  app.use(
    cors({
      origin: CORS_ORIGIN,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.use(express.json());
};

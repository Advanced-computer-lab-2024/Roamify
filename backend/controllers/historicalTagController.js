const mongoose = require("mongoose");
const HistoricalTag = require("../models/historicalTagModel");

const createHistoricalTag = async (req, res) => {
  try {
    const { Type, Period } = req.body;
    const newTag = new HistoricalTag({
      Type: Type,
      Period: Period,
    });

    await newTag.save();

    res.status(201).json({
      message: "Historical tag created successfully!",
      data: newTag,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating historical tag",
      error: error.message,
    });
  }
};

module.exports = { createHistoricalTag };

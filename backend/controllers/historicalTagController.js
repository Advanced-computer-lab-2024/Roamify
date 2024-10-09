const mongoose = require("mongoose");
const HistoricalTag = require("../models/historicalTagModel");

const createHistoricalTag = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newTag = new HistoricalTag({
      name: name,
      description: description,
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

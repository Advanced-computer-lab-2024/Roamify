const mongoose = require("mongoose");
const historicalTagModel = require("../models/historicalTagModel");

const createHistoricalTag = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newTag = new historicalTagModel({
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
const getAllHistoricalTags = async (req, res) => {
  try {
    const tags = await historicalTagModel.find();

    if (!tags || tags.length === 0) {
      return res.status(404).json({
        message: "No historical tags found.",
      });
    }

    res.status(200).json({
      message: "Historical tags retrieved successfully!",
      data: tags,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving historical tags",
      error: error.message,
    });
  }
};

module.exports = { createHistoricalTag,getAllHistoricalTags };

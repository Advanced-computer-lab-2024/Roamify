const mongoose = require("mongoose");
const historicalTagModel = require("../models/historicalTagModel");

const createHistoricalTag = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Validate input
    if (!name || !description) {
      return res.status(400).json({
        message: "Name and description are required fields.",
      });
    }

    // Check for duplicate tags
    const existingTag = await historicalTagModel.findOne({ name });
    if (existingTag) {
      return res.status(400).json({
        message: "A historical tag with this name already exists. Please choose a unique name.",
      });
    }

    // Create new tag
    const newTag = new historicalTagModel({
      name,
      description,
    });

    await newTag.save();

    res.status(201).json({
      message: "Historical tag created successfully!",
      data: newTag,
    });
  } catch (error) {
    console.error("Error creating historical tag:", error);
    res.status(500).json({
      message: "An error occurred while creating the historical tag. Please try again later.",
      error: error.message,
    });
  }
};
const getAllHistoricalTags = async (req, res) => {
  try {
    // Fetch all historical tags
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
    console.error("Error retrieving historical tags:", error);
    res.status(500).json({
      message: "An error occurred while retrieving historical tags. Please try again later.",
      error: error.message,
    });
  }
};

module.exports = {
  createHistoricalTag,
  getAllHistoricalTags,
};

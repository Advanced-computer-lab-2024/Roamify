const preferenceTagModel = require("../models/preferenceTagModel");


const createPreferenceTag = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Check if a tag with the same name already exists
    const existingTag = await preferenceTagModel.findOne({ name });
    if (existingTag) {
      return res.status(400).json({ message: "A preference tag with this name already exists" });
    }

    // Create and save the new tag
    const newTag = new preferenceTagModel({ name, description });
    const savedTag = await newTag.save();
    res.status(201).json({
      message: "Preference tag created successfully",
      tag: savedTag
    });
  } catch (error) {
    console.error("Error creating preference tag:", error);
    res.status(500).json({ message: "Error creating preference tag" });
  }
};


const getAllPreferenceTags = async (req, res) => {
  try {
    const tags = await preferenceTagModel.find();
    res
      .status(200)
      .json({ message: "Preference tags retrieved successfully", tags });
  } catch (error) {
    console.error("Error retrieving preference tags:", error);
    res.status(500).json({ message: "Error retrieving preference tags" });
  }
};




const updatePreferenceTag = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Check if a tag with the same name already exists, excluding the current tag being updated
    const existingTag = await preferenceTagModel.findOne({ name });
    if (existingTag && existingTag._id.toString() !== req.params.id) {
      return res.status(400).json({ message: "A preference tag with this name already exists" });
    }

    // Update the tag
    const updatedTag = await preferenceTagModel.findByIdAndUpdate(
        req.params.id,
        { name, description },
        { new: true, runValidators: true }
    );

    if (!updatedTag) {
      return res.status(404).json({ message: "Preference tag not found" });
    }

    res.status(200).json({
      message: "Preference tag updated successfully",
      tag: updatedTag
    });
  } catch (error) {
    console.error("Error updating preference tag:", error);
    res.status(500).json({ message: "Error updating preference tag" });
  }
};
const deletePreferenceTag = async (req, res) => {
  try {
    const deletedTag = await preferenceTagModel.findByIdAndDelete(req.params.id);
    if (!deletedTag) {
      return res.status(404).json({ message: "Preference tag not found" });
    }
    res.status(200).json({ message: "Preference tag deleted successfully" });
  } catch (error) {
    console.error("Error deleting preference tag:", error);
    res.status(500).json({ message: "Error deleting preference tag" });
  }
};

module.exports = {
  createPreferenceTag,
  getAllPreferenceTags,
  updatePreferenceTag,
  deletePreferenceTag,
};

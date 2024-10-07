const PreferenceTag = require("../models/preferenceTagModel");


const createPreferenceTag = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newTag = new PreferenceTag({ name, description });
    const savedTag = await newTag.save();
    res
      .status(201)
      .json({ message: "Preference tag created successfully", tag: savedTag });
  } catch (error) {
    console.error("Error creating preference tag:", error);
    res.status(500).json({ message: "Error creating preference tag" });
  }
};


const getAllPreferenceTags = async (req, res) => {
  try {
    const tags = await PreferenceTag.find();
    res
      .status(200)
      .json({ message: "Preference tags retrieved successfully", tags });
  } catch (error) {
    console.error("Error retrieving preference tags:", error);
    res.status(500).json({ message: "Error retrieving preference tags" });
  }
};


const getPreferenceTagById = async (req, res) => {
  try {
    const tag = await PreferenceTag.findById(req.params.id);
    if (!tag) {
      return res.status(404).json({ message: "Preference tag not found" });
    }
    res
      .status(200)
      .json({ message: "Preference tag retrieved successfully", tag });
  } catch (error) {
    console.error("Error retrieving preference tag:", error);
    res.status(500).json({ message: "Error retrieving preference tag" });
  }
};


const updatePreferenceTag = async (req, res) => {
  try {
    const { name, description } = req.body;
    const updatedTag = await PreferenceTag.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true, runValidators: true }
    );
    if (!updatedTag) {
      return res.status(404).json({ message: "Preference tag not found" });
    }
    res
      .status(200)
      .json({
        message: "Preference tag updated successfully",
        tag: updatedTag,
      });
  } catch (error) {
    console.error("Error updating preference tag:", error);
    res.status(500).json({ message: "Error updating preference tag" });
  }
};

const deletePreferenceTag = async (req, res) => {
  try {
    const deletedTag = await PreferenceTag.findByIdAndDelete(req.params.id);
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
  getPreferenceTagById,
  updatePreferenceTag,
  deletePreferenceTag,
};

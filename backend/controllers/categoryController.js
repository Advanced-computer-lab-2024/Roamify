const categoryModel = require("../models/categoryModel");

const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: "Name and description are required." });
    }

    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "A category with this name already exists. Please choose a unique name." });
    }

    const newCategory = new categoryModel({ name, description });
    await newCategory.save();

    res.status(201).json({
      message: "Category created successfully.",
      category: newCategory,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({
      message: "An unexpected error occurred while creating the category. Please try again later.",
      error: error.message,
    });
  }
};
const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    if (categories.length === 0) {
      return res.status(404).json({ message: "No categories found." });
    }
    res.status(200).json({
      message: "Categories retrieved successfully.",
      categories,
    });
  } catch (error) {
    console.error("Error retrieving categories:", error);
    res.status(500).json({
      message: "An error occurred while retrieving categories. Please try again later.",
      error: error.message,
    });
  }
};
const updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: "Name and description are required." });
    }

    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory && existingCategory._id.toString() !== req.params.id) {
      return res.status(400).json({ message: "Another category with this name already exists. Please choose a different name." });
    }

    const updatedCategory = await categoryModel.findByIdAndUpdate(
        req.params.id,
        { name, description },
        { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "The category you are trying to update does not exist." });
    }

    res.status(200).json({
      message: "Category updated successfully.",
      category: updatedCategory,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({
      message: "An unexpected error occurred while updating the category. Please try again later.",
      error: error.message,
    });
  }
};
const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await categoryModel.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "The category you are trying to delete does not exist." });
    }

    res.status(200).json({ message: "Category deleted successfully." });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({
      message: "An unexpected error occurred while deleting the category. Please try again later.",
      error: error.message,
    });
  }
};
const chooseCategoryOfActivities = async (req, res) => {
  try {
    const { categoryName } = req.body;

    if (!categoryName) {
      return res.status(400).json({ message: "Category name is required." });
    }

    const category = await categoryModel.findOne({ name: categoryName });
    if (!category) {
      return res.status(404).json({ message: "The selected category does not exist. Please choose a valid category." });
    }

    res.status(200).json({
      message: "Category selected successfully.",
      category,
    });
  } catch (error) {
    console.error("Error selecting category:", error);
    res.status(500).json({
      message: "An unexpected error occurred while selecting the category. Please try again later.",
      error: error.message,
    });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
  chooseCategoryOfActivities,
};

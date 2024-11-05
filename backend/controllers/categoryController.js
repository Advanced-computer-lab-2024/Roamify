const categoryModel = require("../models/categoryModel");

const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category with this name already exists" });
    }
    const newCategory = new categoryModel({ name, description });
    await newCategory.save();

    res.status(201).json({
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating category" });
  }
};


const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    res
      .status(200)
      .json({ message: "Categories retrieved successfully", categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving categories" });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Check if a category with the same name already exists, excluding the current category being updated
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory && existingCategory._id.toString() !== req.params.id) {
      return res.status(400).json({ message: "A category with this name already exists" });
    }

    // Update the category
    const updatedCategory = await categoryModel.findByIdAndUpdate(
        req.params.id,
        { name, description },
        { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating category" });
  }
};


const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await categoryModel.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting category" });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};

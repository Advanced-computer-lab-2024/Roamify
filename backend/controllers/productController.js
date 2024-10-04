const productModel = require("../models/productModel");

const addProduct = async (req, res) => {
  try {
    const sellerId = req.params.id; 
    const { name, description, price, status, quantity } = req.body;

    
    const newProduct = new productModel({
      sellerId,
      name,
      description,
      price,
      status,
      quantity,
    });

    
    await newProduct.save();

    
    res.status(201).json();
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error adding product" });
  }
};
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id; 
    const { name, description, price, quantity, status } = req.body; 

    // Find the product by ID and update it
    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      { name, description, price, quantity, status },
      { new: true, runValidators: true } 
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    
    res.status(200).json({
      message: "Product updated successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error updating product" });
  }
};


module.exports = { addProduct, updateProduct };

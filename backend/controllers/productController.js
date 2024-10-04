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

module.exports = { addProduct };

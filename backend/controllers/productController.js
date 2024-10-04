const productModel = require("../models/productModel");

const addProduct = async (req, res) => {
  try {
    const sellerId = req.params.id;
    const { name, description, price, status, quantity ,rating=0} = req.body;

    const newProduct = new productModel({
      sellerId,
      name,
      description,
      price,
      status,
      quantity,
      rating
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

const sortProductsByRating = async (req, res) => {
  try {
    const sortOrder = req.query.order === "asc" ? 1 : -1;
    const products = await productModel.find().sort({ rating: sortOrder });

    res.status(200).json({
      message: "Products sorted by ratings successfully",
      products,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error fetching and sorting products" });
  }
};

const filterProductsByPrice = async (req, res) => {
  try {
    const { minPrice = 0, maxPrice = Infinity } = req.query; 

    
    const products = await productModel.find({
      price: { $gte: minPrice, $lte: maxPrice },
    });

    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found in this price range" });
    }

   
    res.status(200).json({
      message: "Products filtered by price successfully",
      products,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error filtering products" });
  }
};



module.exports = { addProduct, updateProduct, sortProductsByRating , filterProductsByPrice };

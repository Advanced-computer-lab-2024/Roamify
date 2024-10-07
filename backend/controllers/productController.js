const productModel = require("../models/productModel");

const addProduct = async (req, res) => {
  try {
    const sellerId = req.params.id;
    const { name, description, price, quantity, rating = 0 } = req.body;

    const newProduct = new productModel({
      sellerId,
      name,
      description,
      price,
      quantity,
      rating,
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
    const productId = req.params.id.trim();

    const { description, price } = req.body;

    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      { description, price },
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
    const sortOrder =
      req.query.order && req.query.order.toLowerCase() === "asc" ? 1 : -1;
    const products = await productModel.find().sort({ rating: sortOrder });

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

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

const searchProductByName = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res
        .status(400)
        .json({ message: "Name query parameter is required" });
    }

    const escapedName =
      name.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ".*";

    const products = await productModel.find({
      name: { $regex: escapedName, $options: "i" }, // 'i' for case-insensitive search
    });

    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found with the given name" });
    }

    res.status(200).json({
      message: "Products found",
      products,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error searching products" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await productModel
      .find()
      .populate("sellerId", "username role")
      .exec();

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    const modifiedProducts = products.map((product) => {
      if (product.sellerId && product.sellerId.role === "admin") {
        // Modify the product where sellerId exists and role is admin
        return {
          ...product._doc,
          sellerId: {
            ...product.sellerId._doc,
            username: "Roamify",
          },
        };
      }
      // Return product as it is if sellerId is null or role is not admin
      return product;
    });

    res.status(200).json({
      message: "List of all available products",
      products: modifiedProducts,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error fetching products" });
  }
};



module.exports = {
  addProduct,
  updateProduct,
  sortProductsByRating,
  filterProductsByPrice,
  searchProductByName,
  getAllProducts,
};

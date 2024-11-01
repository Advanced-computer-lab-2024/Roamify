const productModel = require("../models/productModel");


const addProduct = async (req, res) => {
  try {
    const sellerId = req.user._id;

    const { name, description, price, quantity } = req.body;

    // Validate required fields
    if (!name || !description || price == null || quantity == null) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create new product with sellerId from req.user
    const newProduct = new productModel({
      sellerId,
      name,
      description,
      price,
      quantity
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", newProduct });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error adding product" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id.trim();
    const { name, description, price, quantity } = req.body;
    const user = req.user; // Assuming `req.user` contains the authenticated user's details (role and ID)

    // Validate user
    if (!user || !user._id) {
      return res.status(401).json({ message: "Unauthorized: User not authenticated" });
    }

    // Check if at least one field is provided for update
    if (name == null && description == null && price == null && quantity == null) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    // Find the product to verify ownership or admin access
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Allow update if user is admin or if the user owns the product
    if (user.role === "admin" || (product.sellerId && product.sellerId.toString() === user._id.toString())) {
      const updateFields = {};

      if (name) updateFields.name = name;
      if (description) updateFields.description = description;
      if (price != null) updateFields.price = price;
      if (quantity != null) updateFields.quantity = quantity;

      const updatedProduct = await productModel.findByIdAndUpdate(
          productId,
          updateFields,
          { new: true, runValidators: true }
      );

      return res.status(200).json({
        message: "Product updated successfully",
        updatedProduct,
      });
    } else {
      // Deny access if a non-admin user tries to update another seller's product
      return res.status(403).json({
        message: "You do not have permission to update this product",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error updating product" });
  }
};
const getFilteredProducts = async (req, res) => {
  try {
    const { minPrice = 0, maxPrice = Infinity, name, order = 'desc' } = req.query;

    // Build filter object for price range
    const filter = {
      price: { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) },
    };

    // Add name filter if provided
    if (name) {
      const escapedName = name.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ".*";
      filter.name = { $regex: escapedName, $options: "i" };
    }

    // Determine sort order for rating
    const sortOrder = order.toLowerCase() === 'asc' ? 1 : -1;

    // Fetch products with filters and sorting applied
    const products = await productModel.find(filter).sort({ rating: sortOrder });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json({ message: "Filtered products", products });
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    res.status(500).json({ message: "Error fetching filtered products" });
  }
};

module.exports = {
  addProduct,
  updateProduct,
  getFilteredProducts
};

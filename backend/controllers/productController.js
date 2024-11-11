const productModel = require("../models/productModel");
const cloudinary = require('../config/cloudinary'); // Import Cloudinary config
const multer = require('multer');
const storage = multer.memoryStorage(); // Store files in memory before uploading to Cloudinary
const upload = multer({ storage }).array('productImages', 2); // Accept up to 2 images

const addProduct = async (req, res) => {
  try {
    const sellerId = req.user._id;

    const { name, description, price, quantity } = req.body;

    // Validate required fields
    if (!name || !description || price == null || quantity == null) {
      return res.status(400).json({ message: "Missing required fields" });
    }


    if(!req.files)
      throw Error('please insert pictures for your product');
    const imageUrls = [];
for (const file of req.files) {
  await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'image' },
      (error, result) => {
        if (error) {
          reject(new Error('Upload Error'));
        } else {
          imageUrls.push({ url: result.secure_url, publicId: result.public_id });     
           resolve();
        }
      }
    );

    // Use .end(file.buffer) to upload the buffer directly to Cloudinary
    uploadStream.end(file.buffer);
  });
}

const parsedPrice = parseFloat(price);
const parsedQuantity = parseInt(quantity, 10);
    // Create new product with sellerId from req.user
    const newProduct = new productModel({
      sellerId,
      name,
      description,
      price:parsedPrice,
      quantity:parsedQuantity,
      picture:imageUrls
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
    if (name == null && description == null && price == null && quantity == null && !req.files) {
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
      if (price != null) updateFields.price = parseFloat(price);
      if (quantity != null) updateFields.quantity = parseInt(quantity, 10);

      if(req.files || req.files.length>0){

        let imageUrls = [];
        const deletionPromises = product.picture.map(picture => {
          console.log(picture);
          cloudinary.uploader.destroy(picture.publicId)
        }
        );
        await Promise.all(deletionPromises);  // Wait for all Cloudinary deletions to complete
  
        for (const file of req.files) {
          await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              { resource_type: 'image' },
              (error, result) => {
                if (error) {
                  reject(new Error('Upload Error'));
                } else {
                  
                  imageUrls.push({ url: result.secure_url, publicId: result.public_id });     
                  updateFields.picture = imageUrls;
                   resolve();
                }
              }
            );
        
            // Use .end(file.buffer) to upload the buffer directly to Cloudinary
            uploadStream.end(file.buffer);
          });
        }
      }
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
    const {
      minPrice = 0,
      maxPrice = Infinity,
      name,
      order = 'desc',
      page = 1,
      limit = 10
    } = req.query;

    // Validate and parse price range
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);

    // Build filter object
    const filter = {
      price: { $gte: isNaN(min) ? 0 : min, $lte: isNaN(max) ? Infinity : max },
      isArchived: false // Filter out archived products
    };

    // Add name filter if provided
    if (name) {
      const escapedName = name.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ".*";
      filter.name = { $regex: escapedName, $options: "i" };
    }

    // Determine sort order for rating
    const sortOrder = order.toLowerCase() === 'asc' ? 1 : -1;

    // Calculate skip value for pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Fetch products with filters, sorting, and pagination
    const products = await productModel
        .find(filter)
        .sort({ rating: sortOrder })
        .skip(skip)
        .limit(parseInt(limit))
        .populate('sellerId', 'username _id'); // Populate seller details

    // Check if products exist
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json({
      message: "Filtered products",
      products,
      currentPage: parseInt(page),
      totalItems: await productModel.countDocuments(filter),
      itemsPerPage: parseInt(limit)
    });
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    res.status(500).json({ message: "Error fetching filtered products" });
  }
};
const getMyProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const sellerId = req.user._id; // Assuming `req.user` contains the authenticated user's ID

    // Calculate skip value for pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Fetch products created by the seller
    const products = await productModel
        .find({ sellerId })
        .skip(skip)
        .limit(parseInt(limit));

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json({
      message: "Products retrieved successfully",
      products,
      currentPage: parseInt(page),
      totalItems: await productModel.countDocuments({ sellerId }),
      itemsPerPage: parseInt(limit),
    });
  } catch (error) {
    console.error("Error fetching seller's products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
};
const archiveProduct = async (req, res) => {
  try {
    const productId  = req.params.id;

    // Find the product and check if the user is the owner
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the user is a seller and only allow if they own the product
    if (req.user.role === 'seller' && product.sellerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You do not have permission to archive this product" });
    }

    // Archive the product
    product.isArchived = true;
    await product.save();

    res.status(200).json({ message: "Product archived successfully", product });
  } catch (error) {
    console.error("Error archiving product:", error);
    res.status(500).json({ message: "Couldn't archive product" });
  }
};
const unarchiveProduct = async (req, res) => {
  try {
    const productId  = req.params.id;

    // Find the product and check if the user is the owner
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the user is a seller and only allow if they own the product
    if (req.user.role === 'seller' && product.sellerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You do not have permission to unarchive this product" });
    }

    // Unarchive the product
    product.isArchived = false;
    await product.save();

    res.status(200).json({ message: "Product unarchived successfully", product });
  } catch (error) {
    console.error("Error unarchiving product:", error);
    res.status(500).json({ message: "Couldn't unarchive product" });
  }
};

module.exports = {
  addProduct,
  updateProduct,
  getFilteredProducts,
  getMyProducts,
  unarchiveProduct,
  archiveProduct,
  upload
};

const mongoose = require('mongoose');
const userModel = require('../models/userModel');
const sellerModel = require('../models/sellerModel');
const orderModel = require('../models/orderModel');
const productModel = require('../models/productModel');
const bcrypt = require('bcrypt');
const validator = require('validator');
const cloudinary = require('../config/cloudinary');
const multer = require('multer');
const { Types } = require("mongoose");
const storage = multer.memoryStorage();
const upload = multer({ storage }).single('logo');

const createProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    if (user.status === "pending")
      return res.status(403).json({ message: 'Pending admin approval.' });

    if (!user.termsAndConditions)
      return res.status(400).json({ message: 'You must accept the terms and conditions to proceed.' });

    const existingProfile = await sellerModel.findOne({ user: userId });
    if (existingProfile)
      return res.status(400).json({ message: 'Profile already exists.' });

    const { firstName, lastName, description } = req.body;
    await userModel.findByIdAndUpdate(userId, { status: 'active' });

    const newSeller = new sellerModel({
      firstName,
      lastName,
      description,
      user: userId
    });
    await newSeller.save();

    res.status(201).json({ message: 'Seller profile created successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create profile.', error: error.message });
  }
};
const getProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const details = await sellerModel.findOne({ user: userId })
        .select('-_id') // Exclude the `_id` field
        .populate({
          path: 'user',
          select: 'username email -_id' // Include username and email from the user model
        });

    if (!details)
      return res.status(404).json({ message: 'Profile not found.' });

    const { username, email } = details.user;
    const { firstName, lastName, description, logo } = details;

    res.status(200).json({
      username,
      email,
      firstName,
      lastName,
      description,
      logo: logo?.url || null // Provide null if no logo
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve profile.', error: error.message });
  }
};
const updateProfile = async (req, res) => {
  try {
    const sellerId = req.user._id;

    const { firstName, lastName, email, description } = req.body;

    const userUpdates = {};
    const sellerUpdates = {};

    const seller = await sellerModel.findOne({ user: sellerId }).populate('user');
    if (!seller) return res.status(404).json({ message: 'Seller profile not found.' });

    if (firstName) sellerUpdates.firstName = firstName;
    if (lastName) sellerUpdates.lastName = lastName;

    if (email) {
      if (!validator.isEmail(email))
        return res.status(400).json({ message: 'Invalid email address.' });

      const existingUser = await userModel.findOne({ email });
      if (existingUser && email !== seller.user.email)
        return res.status(400).json({ message: 'Email already in use.' });

      userUpdates.email = email;
    }

    if (description) sellerUpdates.description = description;

    await userModel.findByIdAndUpdate(seller.user._id, userUpdates, { new: true });
    const updatedSeller = await sellerModel.findByIdAndUpdate(seller._id, sellerUpdates, { new: true });

    if (updatedSeller)
      return res.status(200).json({ message: 'Profile updated successfully.' });
    else
      return res.status(304).json({ message: 'No changes made to the profile.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update profile.', error: error.message });
  }
};
const uploadLogo = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: 'Logo file is required.' });

    const file = req.file;
    let imageUrl;

    await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: 'image' },
          (error, result) => {
            if (error) reject(new Error('Upload error'));
            else {
              imageUrl = { url: result.secure_url, publicId: result.public_id };
              resolve();
            }
          }
      );
      uploadStream.end(file.buffer);
    });

    await sellerModel.findOneAndUpdate({ user: req.user._id }, { logo: imageUrl });

    res.status(200).json({ message: 'Logo uploaded successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload logo.', error: error.message });
  }
};
const getSalesReport = async (req, res) => {
  try {
    const { filterBy = 'all', month, productId } = req.query;
    const sellerId = req.user._id;

    const products = await productModel.find({ seller: sellerId });
    if (!products.length) return res.status(404).json({ message: 'No products found for this seller.' });

    const productIds = products.map(product => product._id.toString());
    let filter = { 'products.productId': { $in: productIds }, status: 'Delivered' };

    if (filterBy === 'month') {
      if (!month || isNaN(new Date(`${month}-01`)))
        return res.status(400).json({ message: 'Invalid month format.' });

      const startOfMonth = new Date(`${month}-01`);
      const endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0);
      filter.createdAt = { $gte: startOfMonth, $lte: endOfMonth };
    } else if (filterBy === 'product') {
      if (!productId || !productIds.includes(productId))
        return res.status(400).json({ message: 'Invalid or missing product ID.' });

      filter['products.productId'] = productId;
    }

    const orders = await orderModel.find(filter);
    if (!orders.length) return res.status(404).json({ message: 'No sales found for the specified filter.' });

    let totalRevenue = 0;
    let totalProductsSold = 0;
    const productBreakdown = {};

    orders.forEach(order => {
      order.products.forEach(product => {
        if (productIds.includes(product.productId.toString())) {
          const productName = products.find(p => p._id.toString() === product.productId.toString())?.name || 'Unknown Product';

          if (!productBreakdown[productName]) {
            productBreakdown[productName] = {
              productId: product.productId,
              name: productName,
              quantitySold: 0,
              revenue: 0,
            };
          }

          productBreakdown[productName].quantitySold += product.quantity;
          productBreakdown[productName].revenue += product.priceAtPurchase * product.quantity;
          totalProductsSold += product.quantity;
          totalRevenue += product.priceAtPurchase * product.quantity;
        }
      });
    });

    res.status(200).json({
      message: 'Sales report generated successfully.',
      totalRevenue,
      totalProductsSold,
      breakdown: Object.values(productBreakdown)
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate sales report.', error: error.message });
  }
};

module.exports = {
  createProfile,
  getProfile,
  updateProfile,
  upload,
  uploadLogo,
  getSalesReport
};

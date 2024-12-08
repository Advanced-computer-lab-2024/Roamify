const userModel = require('../models/userModel');
const sellerModel = require('../models/sellerModel');
const orderModel=require('../models/orderModel');
const bcrypt = require('bcrypt');
const validator = require('validator');
const cloudinary = require('../config/cloudinary'); // Import Cloudinary config
const multer = require('multer');
const storage = multer.memoryStorage(); // Store files in memory before uploading to Cloudinary
const upload = multer({ storage }).single('logo'); // Accept only 1 file with field name 'profilePicture'


const createProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await userModel.findById(userId);
    if (user.status === "pending")
      throw Error('pending admin approval');

    if (!user.termsAndConditions)
      throw Error('sorry you must accept our terms and conditions in order to proceed');

    if (userId) {
      const result = await sellerModel.findOne({ user: userId });
      if ((result) && userId) {
        return res.status(400).json({ error: 'profile already created' });
      }
    } //check for existence of profile for this user

    const { firstName, lastName, description } = req.body;
    await userModel.findByIdAndUpdate(userId, { status: 'active' });
    const newSeller = new sellerModel({

      firstName,
      lastName,
      description,
      user: userId
    });
    await newSeller.save();

    res.status(200).json({ message: "Created seller successfully" });

  }
  catch (e) {
    res.status(404).json({ message: 'failed', error: e.message });

  }

};
const getProfile = async (req, res) => {
  try {
    const id = req.user._id;
    const details = await sellerModel.findOne({ user: id })
      .select('-_id') // Select fields from sellerModel
      .populate({
        path: 'user',
        select: 'username email -_id' // Select specific fields from the user model
      });

    console.log(details)
    if (details)
      res.status(200).json({ username: details.user.username, email: details.user.email, firstName: details.firstName, lastName: details.lastName, description: details.description, logo: details.logo.url });
    else {
      throw Error("this profile does not exist");
    }
  }
  catch (e) {
    res.status(401).json({ error: e.message });

  }
}
const updateProfile = async (req, res) => {
  try {
    const sellerId = req.user._id;

    const {
      firstName,
      lastName,
      email,
      description
    } = req.body;

    const userUpdates = {};
    const sellerUpdates = {};

    const seller = await sellerModel.findOne({ user: sellerId }).populate('user');




    if (firstName) sellerUpdates.firstName = firstName;
    if (lastName) sellerUpdates.lastName = lastName;


    if (email) {
      const existingUser = await userModel.findOne({ email });
      if (existingUser && email !== seller.user.email) {
        return res.status(400).json({ error: "Email already exists" });
      }
      if (!validator.isEmail(email)) {
        throw Error('Email is not valid');
      }
      userUpdates.email = email;
    }





    if (description) sellerUpdates.description = description;


    const updatedUser = await userModel.findByIdAndUpdate(sellerId, userUpdates, { new: true });
    const updatedSeller = await sellerModel.findByIdAndUpdate(seller._id, sellerUpdates, { new: true });

    if (updatedUser || updatedSeller) {
      return res.status(200).json({ message: 'updated' });
    } else {
      return res.status(404).json({ message: 'No updates made' });
    }
  } catch (e) {
    return res.status(400).json({ message: 'failed', error: e.message });
  }
};
const uploadLogo = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({ message: 'Logo is required' });
    }

    const file = req.file;
    let imageUrl;

    await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'image' },
        (error, result) => {
          if (error) {
            reject(new Error('Upload Error'));
          } else {
            imageUrl = { url: result.secure_url, publicId: result.public_id };
            resolve();
          }
        }
      );

      // Upload the file buffer directly to Cloudinary
      uploadStream.end(file.buffer);
    });

    await sellerModel.findOneAndUpdate({ user: req.user._id }, { logo: imageUrl });

    res.status(200).json({
      message: 'Logo uploaded successfully',
    });
  }
  catch (error) {
    res.status(500).json({ message: 'Error uploading logo', error: error.message });


  }
}
const getSalesReport = async (req, res) => {
  try {
    const sellerId = req.user._id;

    // Fetch orders with relevant statuses and populate product details
    const orders = await orderModel.find({
      status: { $in: ['Delivered','Out For Delivery','Processing','Arrived'] },
    }).populate({
      path: 'products.productId',
      select: 'name price sellerId', // Only populate necessary fields
    });

    if (!orders.length) {
      return res.status(404).json({ message: 'No sales data found for this seller.' });
    }

    let totalRevenue = 0;
    const productRevenue = {};

    for (const order of orders) {
      for (const product of order.products) {
        if (!product.productId) {
          // Skip if the productId is missing (possibly deleted)
          continue;
        }

        if (product.productId.sellerId.toString() === sellerId.toString()) {
          const productTotal = product.priceAtPurchase * product.quantity;
          totalRevenue += productTotal;

          if (!productRevenue[product.productId._id]) {
            productRevenue[product.productId._id] = {
              name: product.productId.name,
              revenue: productTotal,
              quantity: product.quantity,
            };
          } else {
            productRevenue[product.productId._id].revenue += productTotal;
            productRevenue[product.productId._id].quantity += product.quantity;
          }
        }
      }
    }

    res.status(200).json({
      message: 'Sales report retrieved successfully.',
      report: {
        totalRevenue,
        breakdown: Object.values(productRevenue),
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate sales report.', error: error.message });
  }
};


module.exports = { createProfile,
  getProfile,
  updateProfile,
  upload,
  uploadLogo,
  getSalesReport
};
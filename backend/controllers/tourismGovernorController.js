const placeModel = require("../models/placeModel");
const historicalTagModel = require("../models/historicalTagModel");
const cloudinary = require('../config/cloudinary'); // Import Cloudinary config
const multer = require('multer');
const mongoose = require('mongoose');

// Configure multer to store files in memory
const storage = multer.memoryStorage(); // Store files in memory before uploading to Cloudinary
const upload = multer({ storage }).array('placesImages', 2); // Accept up to 2 images
const createPlace = async (req, res) => {
  try {
    const tourismGovernorId = req.user._id;

    // Parse JSON strings to objects
    const {
      type,
      name,
      description,
      location: locationJSON,
      tagPlace, // tagPlace is now an array of IDs, so no need to parse it
      openingHours,
      closingHours,
      ticketPrice: ticketPriceJSON,
    } = req.body;

    const location = JSON.parse(locationJSON);
    const ticketPrice = JSON.parse(ticketPriceJSON);
if (!req.files || req.files.length === 0) {
  throw new Error("No images uploaded.");
}


    if (!type || !name || !description || !location || !tagPlace || !ticketPrice || !openingHours || !closingHours) {
      throw new Error('Please fill all required fields');
    }
    const nameValidator = await placeModel.findOne({name});
    if(nameValidator)
      throw Error("Please choose another name for this place this name already exists");

    // Validate that tagPlace is an array of valid ObjectIds
    const tagIds = Array.isArray(tagPlace)
    ? tagPlace.map(id => new mongoose.Types.ObjectId(id))
    : JSON.parse(tagPlace).map(id => new mongoose.Types.ObjectId(id));
  
    // Upload images to Cloudinary and get URLs
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


    // Create a new place document
    const newPlace = new placeModel({
      type,
      name,
      description,
      tags: tagIds, // Save tag IDs directly
      location,
      ticketPrice,
      openingHours,
      closingHours,
      tourismGovernorId,
      pictures: imageUrls // Save Cloudinary image URLs
    });

    await newPlace.save();
    res.status(200).json({ message: 'Place created successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create place', error: error.message });
  }
};
const getPlaces = async (req, res) => {
  try {
    const historicalPlaces = await placeModel
      .find()
      .populate({
        path: "tourismGovernorId",
        select: "-password -createdAt -updatedAt -__v -status -role " 
      })
      .populate({path:"tags",
        select:"-__v"
      }

      )
      .select('-createdAt -updatedAt -__v') 
      .select("-pictures.publicId -pictures._id"); 
    if (!historicalPlaces || historicalPlaces.length === 0) {
      return res.status(404).json({ message: "There are no places" });
    }

    res.status(200).json(historicalPlaces);
  } catch (e) {
    return res.status(401).json({ message: "Failed", error: e.message });
  }
};
const updatePlace = async (req, res) => {
  try {
    console.log(req.files);
    const historicalPlaceId = req.params.historicalPlaceId; // Fixed typo
    const tourismGovernorId = req.user._id;

    // Find the historical place and populate tourismGovernorId
    const historicalPlace = await placeModel
      .findById(historicalPlaceId)
      .populate("tourismGovernorId");

    // Check if the place exists
    if (!historicalPlace) {
      return res.status(404).json({ message: "Historical place not found" });
    }

    // Correctly check if the current user is authorized to edit the place
    if (
      historicalPlace.tourismGovernorId._id.toString() !== tourismGovernorId
    ) {
      return res
        .status(403)
        .json({ message: "You are not allowed to edit others' places" });
    }

    // Extract fields from request body
    const {
      description,
      tagPlace,
      location,
      ticketPrice,
      openingHours,
      closingHours
    } = req.body;
    const query = {};



  

    if (description) query.description = description;
    if (location) query.location = JSON.parse(location);
    if (ticketPrice) query.ticketPrice = JSON.parse(ticketPrice);
    if(openingHours) query.openingHours = openingHours;
    if(closingHours) query.closingHours = closingHours;
    if (tagPlace) {
      const parsedTagPlace = JSON.parse(tagPlace); // Parse tagPlace as an array
      const tagDocs = await historicalTagModel.find({ _id: { $in: parsedTagPlace } });
      
      if (tagDocs.length !== parsedTagPlace.length) {
        throw Error("Some preference tags are invalid");
      }

      const tagIds = tagDocs.map(tag => tag._id);
      query.tags = tagIds; // Using IDs directly
    }


    if(req.files || req.files.length>0){

      let imageUrls = [];
      const deletionPromises = historicalPlace.pictures.map(picture => {
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
                query.pictures = imageUrls;
                 resolve();
              }
            }
          );
      
          // Use .end(file.buffer) to upload the buffer directly to Cloudinary
          uploadStream.end(file.buffer);
        });
      }
    }
    

    // Update the historical place
    const updatedHistoricalPlace = await placeModel
      .findByIdAndUpdate(historicalPlaceId, query);

    // Send response
    
    res.status(200).json({
      message: "Place updated successfully"
    });
  } catch (e) {
    res
      .status(401)
      .json({ error: e.message, message: "Could not update place" }); // Use 500 for server errors
  }
};
const deletePlace = async (req, res) => {
  try {
    const tourismGovernorId = req.user._id;
    const historicalPlaceId = req.params.historicalPlaceId;

    const historicalPlace = await placeModel.findById(historicalPlaceId).populate("tourismGovernorId");

    if (!historicalPlace) {
      return res.status(404).json({ message: "Place doesn't exist" });
    }

    if (historicalPlace.tourismGovernorId._id.toString() !== tourismGovernorId) {
      return res.status(403).json({ message: "You don't own this place; only owners can delete" });
    }

    // Delete images from Cloudinary
    const deletionPromises = historicalPlace.pictures.map(picture => {
      console.log(picture);
      cloudinary.uploader.destroy(picture.publicId)
    }
    );
    await Promise.all(deletionPromises);  // Wait for all Cloudinary deletions to complete

    await placeModel.findByIdAndDelete(historicalPlaceId);

    res.status(200).json({ message: "Place deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
const getMyPlaces = async (req, res) => {
  try {
    const tourismGovernorId = req.user._id;

    const historicalPlaces = await placeModel
      .find({ tourismGovernorId })
      .populate("tags")
      .select('-createdAt -updatedAt -__v')  // Exclude `createdAt`, `updatedAt`, and `__v`
      .select("-pictures.publicId -pictures._id"); // Specify other required fields

    if (!historicalPlaces || historicalPlaces.length === 0) {
      return res.status(404).json({ message: 'There are no places. Try creating a new one.' });
    }

    res.status(200).json(historicalPlaces);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

module.exports = {
  createPlace,
  getPlaces,
  updatePlace,
  deletePlace,
  getMyPlaces,
  upload
};

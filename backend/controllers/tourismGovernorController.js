const placeModel = require("../models/placeModel");
const historicalTagModel = require("../models/historicalTagModel");
const cloudinary = require('../config/cloudinary'); // Import Cloudinary config
const multer = require('multer');
const mongoose = require('mongoose');
const {upload} = require("./userController");

const createPlace = async (req, res) => {
  try {
    const tourismGovernorId = req.user._id;

    const {
      type,
      name,
      description,
      location: locationJSON,
      tagPlace,
      openingHours,
      closingHours,
      ticketPrice: ticketPriceJSON,
    } = req.body;

    const location = JSON.parse(locationJSON);
    const ticketPrice = JSON.parse(ticketPriceJSON);

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Please upload at least one image for the place." });
    }

    if (!type || !name || !description || !location || !tagPlace || !ticketPrice || !openingHours || !closingHours) {
      return res.status(400).json({ message: "All fields are required. Please ensure no fields are left empty." });
    }

    const nameValidator = await placeModel.findOne({ name });
    if (nameValidator) {
      return res.status(400).json({ message: "A place with this name already exists. Please choose another name." });
    }

    const tagIds = Array.isArray(tagPlace)
        ? tagPlace.map(id => new mongoose.Types.ObjectId(id))
        : JSON.parse(tagPlace).map(id => new mongoose.Types.ObjectId(id));

    const imageUrls = [];
    for (const file of req.files) {
      await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: "image" },
            (error, result) => {
              if (error) {
                reject(new Error("Error uploading images to Cloudinary."));
              } else {
                imageUrls.push({ url: result.secure_url, publicId: result.public_id });
                resolve();
              }
            }
        );
        uploadStream.end(file.buffer);
      });
    }

    const newPlace = new placeModel({
      type,
      name,
      description,
      tags: tagIds,
      location,
      ticketPrice,
      openingHours,
      closingHours,
      tourismGovernorId,
      pictures: imageUrls,
    });

    await newPlace.save();
    res.status(201).json({ message: "Place created successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to create place.", error: error.message });
  }
};
const getPlaces = async (req, res) => {
  try {
    const historicalPlaces = await placeModel
        .find()
        .populate({
          path: "tourismGovernorId",
          select: "-password -createdAt -updatedAt -__v -status -role",
        })
        .populate({
          path: "tags",
          select: "-__v",
        })
        .select("-createdAt -updatedAt -__v")
        .select("-pictures.publicId -pictures._id");

    if (!historicalPlaces || historicalPlaces.length === 0) {
      return res.status(404).json({ message: "No places found. Try creating a new one." });
    }

    res.status(200).json({ message: "Places retrieved successfully.", data: historicalPlaces });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve places.", error: error.message });
  }
};
const updatePlace = async (req, res) => {
  try {
    const historicalPlaceId = req.params.historicalPlaceId;
    const tourismGovernorId = req.user._id;

    const historicalPlace = await placeModel.findById(historicalPlaceId).populate("tourismGovernorId");

    if (!historicalPlace) {
      return res.status(404).json({ message: "Place not found. Please ensure the ID is correct." });
    }

    if (historicalPlace.tourismGovernorId._id.toString() !== tourismGovernorId) {
      return res.status(403).json({ message: "You are not authorized to update this place." });
    }

    const {
      description,
      tagPlace,
      location,
      ticketPrice,
      openingHours,
      closingHours,
    } = req.body;

    const query = {};

    if (description) query.description = description;
    if (location) query.location = JSON.parse(location);
    if (ticketPrice) query.ticketPrice = JSON.parse(ticketPrice);
    if (openingHours) query.openingHours = openingHours;
    if (closingHours) query.closingHours = closingHours;

    if (tagPlace) {
      const parsedTagPlace = JSON.parse(tagPlace);
      const tagDocs = await historicalTagModel.find({ _id: { $in: parsedTagPlace } });

      if (tagDocs.length !== parsedTagPlace.length) {
        return res.status(400).json({ message: "Some tags are invalid. Please check the tag IDs provided." });
      }

      query.tags = tagDocs.map(tag => tag._id);
    }

    if (req.files && req.files.length > 0) {
      const imageUrls = [];
      const deletionPromises = historicalPlace.pictures.map(picture =>
          cloudinary.uploader.destroy(picture.publicId)
      );
      await Promise.all(deletionPromises);

      for (const file of req.files) {
        await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
              { resource_type: "image" },
              (error, result) => {
                if (error) {
                  reject(new Error("Error uploading new images."));
                } else {
                  imageUrls.push({ url: result.secure_url, publicId: result.public_id });
                  query.pictures = imageUrls;
                  resolve();
                }
              }
          );
          uploadStream.end(file.buffer);
        });
      }
    }

    await placeModel.findByIdAndUpdate(historicalPlaceId, query);

    res.status(200).json({ message: "Place updated successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to update place.", error: error.message });
  }
};
const deletePlace = async (req, res) => {
  try {
    const tourismGovernorId = req.user._id;
    const historicalPlaceId = req.params.historicalPlaceId;

    const historicalPlace = await placeModel.findById(historicalPlaceId).populate("tourismGovernorId");

    if (!historicalPlace) {
      return res.status(404).json({ message: "Place not found. Please check the ID and try again." });
    }

    if (historicalPlace.tourismGovernorId._id.toString() !== tourismGovernorId) {
      return res.status(403).json({ message: "You are not authorized to delete this place." });
    }

    const deletionPromises = historicalPlace.pictures.map(picture =>
        cloudinary.uploader.destroy(picture.publicId)
    );
    await Promise.all(deletionPromises);

    await placeModel.findByIdAndDelete(historicalPlaceId);

    res.status(200).json({ message: "Place deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete place.", error: error.message });
  }
};
const getMyPlaces = async (req, res) => {
  try {
    const tourismGovernorId = req.user._id;

    const historicalPlaces = await placeModel
        .find({ tourismGovernorId })
        .populate("tags")
        .select("-createdAt -updatedAt -__v")
        .select("-pictures.publicId -pictures._id");

    if (!historicalPlaces || historicalPlaces.length === 0) {
      return res.status(404).json({ message: "You have no places yet. Start creating one now." });
    }

    res.status(200).json({ message: "Your places retrieved successfully.", data: historicalPlaces });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve your places.", error: error.message });
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


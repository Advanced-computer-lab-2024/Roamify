const placeModel = require("../models/placeModel");
const historicalTagModel = require("../models/historicalTagModel");
const fs = require('fs');
const path = require('path');


function deleteFileByName(folderName, fileName, callback) {
  // Adjust the path to target one folder up from the current directory
  const directoryPath = path.join(__dirname, '..', folderName);
  console.log("Directory Path:", directoryPath);

  // Read the directory to find the file
  fs.readdir(directoryPath, (err, files) => {


      if (err) {
          console.error("Error reading directory", err);
          callback(err);
          return;
      }

      // Find the file and delete it
      const fileToDelete = files.find(file => file.includes(fileName));
      console.log("Files found:", files);
      console.log("File to delete:", fileToDelete);
      if (fileToDelete) {
          fs.unlink(path.join(directoryPath, fileToDelete), (err) => {
              if (err) {
                  console.error("Error deleting file", err);
                  callback(err);
                  return;
              }
              callback(null);
          });
      } else {
          callback(new Error("File not found"));
      }
  });
}

const createPlace = async (req, res) => {
  try {
    const tourismGovernorId = req.user._id;
    // Parsing JSON strings to objects
    const {
      type,
      name,
      description,
      location: locationJSON,
      tagPlace: tagPlaceJSON,
      openingHours,
      closingHours,
      ticketPrice: ticketPriceJSON,
    } = req.body;

    // Convert JSON strings to objects
    const location = JSON.parse(locationJSON);
    const ticketPrice = JSON.parse(ticketPriceJSON);
    const tagPlace = JSON.parse(tagPlaceJSON);

    // Check if all required fields are present
    if (!type || !name || !description || !location || !tagPlace || !ticketPrice || !openingHours || !closingHours) {
      throw new Error('Please fill all required fields');
    }

    console.log(req.files);
    // Get the picture file paths (saved by Multer in req.files)
    // Ensure req.files is defined and is an array before trying to map over it
    const picturePaths = req.files ? req.files.map(file => `/placeImages/${file.filename}`) : [];

    // Retrieve the tag IDs based on the provided tag names
    const tags = await historicalTagModel.find({ name: { $in: tagPlace } }).select('_id');
    const tagIds = tags.map(tag => tag._id);

    // Create a new place document
    const newPlace = new placeModel({
      type,
      name,
      description,
      tags: tagIds,         // Save the tag IDs here
      pictures: picturePaths, // Save the file paths as pictures
      location,
      ticketPrice,
      openingHours,
      closingHours,
      tourismGovernorId,
    });

    // Save the place in MongoDB
    await newPlace.save();

    // Send a success response
    res.status(200).json({ message: 'Place created successfully', place: newPlace });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to create place', error: error.message });
  }
};





const getPlaces = async (req, res) => {
  try {
    const historicalPlaces = await placeModel
      .find()
      .populate("tourismGovernorId")
      .populate("tags");
    if (!historicalPlaces)
      res.status(401).json({ message: "there are no places" });
    else res.status(200).json(historicalPlaces);
  } catch (e) {
    return res.status(500).json({ message: "failed", error: e.message });
  }
};

const updatePlace = async (req, res) => {
  try {
    const historicalPlaceId = req.params.historicalPlaceId; // Fixed typo
    const tourismGovernorId = req.params.tourismGovernorId;

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
      type,
      name,
      description,
      tagPlace,
      pictures,
      location,
      ticketPrice,
    } = req.body;
    const query = {};

    const tags = await historicalTagModel
      .find({ Type: { $in: tagPlace } })
      .select("_id");
    const tagIds = tags.map((tag) => tag._id);

    // Build the update query
    if (type) query.type = type;
    if (name) query.name = name;
    if (description) query.description = description;
    if (tags) query.tags = tagIds;
    if (pictures) query.pictures = pictures;
    if (location) query.location = location;
    if (ticketPrice) query.ticketPrice = ticketPrice;

    // Update the historical place
    const updatedHistoricalPlace = await placeModel
      .findByIdAndUpdate(historicalPlaceId, query, { new: true })
      .populate("tourismGovernorId")
      .populate("tags");

    // Send response
    res.status(200).json({
      message: "Place updated successfully",
      place: updatedHistoricalPlace,
    });
  } catch (e) {
    console.error(e); // Log the error for debugging
    res
      .status(500)
      .json({ error: e.message, message: "Could not update place" }); // Use 500 for server errors
  }
};

const deletePlace = async (req, res) => {
  try {
    const tourismGovernorId = req.user._id;
    const historicalPlaceId = req.params.historicalPlaceId;

    const historicalPlace = await placeModel.findById(historicalPlaceId).populate("tourismGovernorId");

    if (!historicalPlace) {
      throw new Error("Place doesn't exist");
    }

    if (historicalPlace.tourismGovernorId._id.toString() === tourismGovernorId) {
      // Use the delete function for each image path
      historicalPlace.pictures.forEach((picturePath) => {
        const fileName = path.basename(picturePath);
        deleteFileByName('placesImages', fileName, (err) => {
          if (err) {
           throw Error('error in deleting images');
            // Optionally send a response or handle the error further
          }
        });
      });

      // Delete the place after all files are handled
      await placeModel.findByIdAndDelete(historicalPlaceId);
      res.status(200).json({ message: "Place and associated images deleted successfully" });
    } else {
      throw new Error("You don't own this place; only owners can delete");
    }
  } catch (err) {
    console.error(err);
    res.status(401).json({error: err.message});
  }
};


const getMyPlaces = async (req, res) => {
  try {
    const tourismGovernorId = req.user._id;
    const historicalPlaces = await placeModel
      .find({ tourismGovernorId })
      .populate("tourismGovernorId")
      .populate("tags");
    res.status(200).json(historicalPlaces);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};





module.exports = {
  createPlace,
  getPlaces,
  updatePlace,
  deletePlace,
  getMyPlaces,
};

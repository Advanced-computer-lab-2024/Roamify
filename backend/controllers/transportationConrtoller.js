import mongoose from "mongoose";
import transportationModel from "../models/transportationModel";
import receiptModel from "../models/receiptModel";
import walletModel from "../models/walletModel";
import touristModel from "../models/touristModel";

const createTransportation = async (req, res) => {
    try {
        const { name, time, date, type, pickupLocation, dropOffLocation, price } = req.body;

        // Validate required fields
        if (!name || !time || !date || !type || !pickupLocation || !dropOffLocation || !price) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const exists = await transportationModel.findOne({ name });
        if (exists) return res.status(400).json({ message: 'this name already exists' })
        // Create a new transportation entry
        const newTransportation = new transportationModel({
            advertiser: req.user._id,
            name,
            time,
            date,
            type,
            price,
            pickupLocation: pickupLocation,
            dropOffLocation: dropOffLocation
        });

        // Save to the database
        await newTransportation.save();

        res.status(201).json({
            message: "Transportation created successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to create transportation",
            error: error.message
        });
    }
};
const getAllTransportation = async (req, res) => {
    try {
        const transportations = await transportationModel.find().populate('advertiser', 'username');
        if (!transportations || transportations.length == 0)
            return res.status(400).json({ message: 'no transportation created yet' });


        return res.status(200).json({ message: 'transportations retrieved successfully', transportations })

    }
    catch (error) {
        return res.status(400).json({ message: 'can\'t retrieve transportation', error: error.message })
    }
}
const deleteTransportation = async (req, res) => {
    try {
        const transportationIdString = req.body.transportationId;

        if (!transportationIdString) {
            return res.status(400).json({ message: 'Please choose a transportation to delete' });
        }

        const transportationId = new mongoose.Types.ObjectId(transportationIdString);

        const transportation = await transportationModel.findById(transportationId);

        if (!transportation) {
            return res.status(404).json({ message: 'Transportation not found' });
        }

        if (req.user._id.toString() !== transportation.advertiser.toString()) return res.status(403).json({ message: 'sorry you dont have the authority to delete this transportation' })
        if (transportation.touristsBooked.length > 0) return res.status(400).json({ message: 'transportation is booked by tourists can\'t delete it' })
        await transportationModel.findByIdAndDelete(transportationId);
        return res.status(200).json({ message: 'Deleted transportation successfully' });

    } catch (error) {
        return res.status(500).json({ message: 'Error deleting transportation', error: error.message });
    }
};
const editTransportation = async (req, res) => {
    try {
        const transportationIdString = req.body.transportationId;

        if (!transportationIdString) {
            return res.status(400).json({ message: 'Please choose a transportation to edit' });
        }

        const transportationId = new mongoose.Types.ObjectId(transportationIdString);

        // Find the transportation by ID
        const transportation = await transportationModel.findById(transportationId);

        if (!transportation) {
            return res.status(404).json({ message: 'Transportation not found' });
        }

        // Check if the user is the advertiser
        if (req.user._id.toString() !== transportation.advertiser.toString()) {
            return res.status(403).json({ message: 'Sorry, you do not have the authority to edit this transportation' });
        }

        // Check if the transportation is booked by tourists
        if (transportation.touristsBooked.length > 0) {
            return res.status(400).json({ message: 'Transportation is booked by tourists and cannot be edited' });
        }

        // Define the fields that can be updated
        const { name, dropOffLocation, pickupLocation, time, type, cost } = req.body;

        // Update only the allowed fields if they are provided
        if (name) transportation.name = name;
        if (dropOffLocation) transportation.dropOffLocation = dropOffLocation;
        if (pickupLocation) transportation.pickupLocation = pickupLocation;
        if (time) transportation.time = time;
        if (type) transportation.type = type;
        if (cost) transportation.cost = cost;

        // Save the updated transportation document
        await transportation.save();

        return res.status(200).json({ message: 'Transportation updated successfully' });

    } catch (error) {
        return res.status(500).json({ message: 'Error updating transportation', error: error.message });
    }
};
const getMyCreatedTransportations = async (req, res) => {
    try {
        // Find all transportation records where the user is the advertiser
        const transportations = await transportationModel.find({ advertiser: req.user._id });

        // Check if the user has any transportations
        if (transportations.length === 0) {
            return res.status(404).json({ message: 'No transportations found for this user.' });
        }

        return res.status(200).json({ transportations });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching transportations', error: error.message });
    }
};
const cancelTransportationBooking = async (req, res) => {
    try {
        const transportationIdString = req.body.transportationId;

        // Check if transportation ID is provided
        if (!transportationIdString) {
            return res
                .status(400)
                .json({
                    message:
                        "Please select one of your booked transportations to cancel.",
                });
        }

        const transportationId = new mongoose.Types.ObjectId(
            transportationIdString
        );

        // Find the transportation with the provided ID and check if the user has booked it
        const transportation = await transportationModel.findOne({
            _id: transportationId,
            touristsBooked: req.user._id,
        });

        // If the transportation is not found or the user has not booked it, return an error
        if (!transportation) {
            return res
                .status(400)
                .json({
                    message: "Please choose a valid booked transportation to cancel.",
                });
        }

        // Calculate the time difference between now and the transportation date
        const now = new Date();
        const transportationDate = new Date(transportation.date);
        const hoursUntilTransportation =
            (transportationDate - now) / (1000 * 60 * 60);

        // Check if the transportation is more than 48 hours away
        if (hoursUntilTransportation <= 48) {
            return res
                .status(400)
                .json({
                    message:
                        "Cancellations are only allowed more than 48 hours before the scheduled transportation.",
                });
        }

        // Remove the user from the touristsBooked array
        await transportationModel.updateOne(
            { _id: transportationId },
            { $pull: { touristsBooked: req.user._id } }
        );
        const receipt = new receiptModel({
            type: "transportation",
            status: "successful",
            receiptType: "refund",
            tourist: req.user._id,
            price: transportation.price,
        });
        await receipt.save();
        const wallet = await walletModel.findOne({ tourist: req.user._id });
        wallet.availableCredit += transportation.price;
        await wallet.save();

        return res
            .status(200)
            .json({ message: "Transportation booking cancelled successfully." });
    } catch (error) {
        return res
            .status(500)
            .json({
                message: "Error cancelling transportation booking",
                error: error.message,
            });
    }
};
const getBookedTransportations = async (req, res) => {
    try {
        const userId = req.user._id;

        // Find all transportations where the user's ID is in touristsBooked
        const transportations = await transportationModel.find({
            touristsBooked: userId,
        });

        if (!transportations)
            return res
                .status(400)
                .json({ message: "you have not booked any transportations yet" });
        return res.status(200).json({ transportations });
    } catch (error) {
        return res
            .status(400)
            .json({
                message: "Error fetching booked transportations",
                error: error.message,
            });
    }
};
const getBookedFutureTransportations = async (req, res) => {
    try {
        const userId = req.user._id;

        // Get the current date and set time to midnight for a clean comparison
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Find all transportations where the user's ID is in touristsBooked and date is in the future
        const transportations = await transportationModel.find({
            touristsBooked: userId,
            date: { $gt: today },
        });

        if (!transportations || transportations.length === 0) {
            return res
                .status(400)
                .json({ message: "You have no future transportation bookings." });
        }

        return res.status(200).json({ transportations });
    } catch (error) {
        return res
            .status(400)
            .json({
                message: "Error fetching future booked transportations",
                error: error.message,
            });
    }
};
const getFilteredTransportations = async (req, res) => {
    try {
        const {
            pickupLocation,
            dropOffLocation,
            date,
            time,
            type,
            sortBy,
            sortOrder = "asc",
        } = req.query;

        let filter = {};

        // Filter by pickup location if provided
        if (pickupLocation) {
            filter.pickupLocation = { $regex: pickupLocation, $options: "i" }; // Case-insensitive search
        }

        // Filter by drop-off location if provided
        if (dropOffLocation) {
            filter.dropOffLocation = { $regex: dropOffLocation, $options: "i" }; // Case-insensitive search
        }

        // Filter by date if provided (any date on or after the specified date)
        if (date) {
            filter.date = { $gte: new Date(date) };
        }

        // Filter by exact time if provided
        if (time) {
            filter.time = time;
        }

        // Filter by type if provided (e.g., bus, train, etc.)
        if (type) {
            filter.type = type;
        }

        // Sorting options
        let sortOptions = {};
        if (sortBy) {
            sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;
        }

        // Execute the query with the defined filters
        const transportations = await transportationModel
            .find(filter)
            .sort(sortOptions)
            .populate({
                path: "advertiser",
                select: "name email", // Populate advertiser with specific fields
            });

        if (!transportations.length) {
            return res
                .status(404)
                .json({ message: "No transportations found matching your criteria" });
        }

        res
            .status(200)
            .json({
                message: "Transportations retrieved successfully",
                transportations,
            });
    } catch (error) {
        res
            .status(500)
            .json({
                message: "Failed to retrieve transportations",
                error: error.message,
            });
    }
};
const bookTransportation = async (req, res) => {
    try {
        const tourist = await touristModel
            .findOne({ user: req.user._id })
            .populate("wallet");

        const transportationIdString = req.body.transportationIdString;
        if (!transportationIdString) throw Error("please pick a transportation");

        const transportationId = new mongoose.Types.ObjectId(
            transportationIdString
        );

        const transportation = await transportationModel.findById(transportationId);
        if (!transportation) throw Error("Invalid transportation");
        if (transportation.touristsBooked.includes(req.user._id)) {
            return res
                .status(400)
                .json({ message: "You have already booked this transportation" });
        }
        if (tourist.wallet.availableCredit < transportation.price) {
            const receipt = new receiptModel({
                type: "transportation",
                status: "failed",
                tourist: req.user._id,
                price: transportation.price,
                receiptType: "payment",
            });
            await receipt.save();
            return res.status(400).json({ message: "insufficient funds" });
        }
        transportation.touristsBooked.push(req.user._id);
        await transportation.save();
        const receipt = new receiptModel({
            type: "transportation",
            status: "successful",
            tourist: req.user._id,
            price: transportation.price,
            receiptType: "payment",
        });
        await receipt.save();
        const wallet = await walletModel.findById(tourist.wallet._id);

        wallet.availableCredit -= transportation.price;
        await tourist.save();
        await wallet.save();

        return res.status(200).json({
            message: "Transportation booked successfully",
        });
    } catch (error) {
        return res
            .status(400)
            .json({ message: "unable to book transportation", error: error.message });
    }
};

module.exports = {
    cancelTransportationBooking,
    getFilteredTransportations,
    getBookedFutureTransportations,
    bookTransportation,
    getBookedTransportations
}
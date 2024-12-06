const addressModel = require('../models/addressModel');

const addAddress = async (req, res) => {
    try {
        const { name, street, city, state, postalCode, country, isDefault } = req.body;

        if (!name || !street || !city || !postalCode || !country) {
            return res.status(400).json({
                message: "Name, street, city, postal code, and country are required.",
            });
        }

        const newAddress = new addressModel({
            user: req.user._id,
            name,
            street,
            city,
            state,
            postalCode,
            country,
            isDefault: isDefault || false,
        });

        if (isDefault) {
            await addressModel.updateMany({ user: req.user._id }, { isDefault: false });
        }

        const savedAddress = await newAddress.save();
        if (!savedAddress) {
            return res.status(500).json({ message: "Failed to create the address." });
        }

        res.status(201).json({
            message: "Address added successfully.",
            address: savedAddress,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to add address.",
            error: error.message,
        });
    }
};
const getUserAddresses = async (req, res) => {
    try {
        const addresses = await addressModel.find({ user: req.user._id });
        if (!addresses || addresses.length === 0) {
            return res.status(404).json({ message: "No addresses found for this user." });
        }

        res.status(200).json({
            message: "Addresses retrieved successfully.",
            addresses,
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve addresses.", error: error.message });
    }
};
const setDefaultAddress = async (req, res) => {
    try {
        const { id } = req.params;

        const address = await addressModel.findOne({ _id: id, user: req.user._id });
        if (!address) {
            return res.status(404).json({ message: "Address not found." });
        }

        await addressModel.updateMany({ user: req.user._id }, { isDefault: false }); // Unset other default addresses
        address.isDefault = true;

        const updatedAddress = await address.save();
        res.status(200).json({ message: "Default address updated successfully.", address: updatedAddress });
    } catch (error) {
        res.status(500).json({ message: "Failed to set default address.", error: error.message });
    }
};
const deleteAddress = async (req, res) => {
    try {
        const { id } = req.params;

        const address = await addressModel.findOneAndDelete({ _id: id, user: req.user._id });
        if (!address) {
            return res.status(404).json({ message: "Address not found or already deleted." });
        }

        res.status(200).json({ message: `Address ${address.name} deleted successfully.` });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete address.", error: error.message });
    }
};

module.exports = {
    addAddress,
    getUserAddresses,
    setDefaultAddress,
    deleteAddress
};

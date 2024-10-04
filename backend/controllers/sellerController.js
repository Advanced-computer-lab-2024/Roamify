const userModel = require('../models/userModel');
const sellerModel = require('../models/sellerModel');

const createProfile = async (req, res) => {
    try {
        const userId = req.params.id;

        if (userId) {
            const result = await sellerModel.findOne({ user: userId });
            if ((result) && userId) {
                return res.status(400).json({ error: 'profile already created' });
            }
        } //check for existence of profile for this user

        const { fName, lName, description } = req.body;
        await userModel.findByIdAndUpdate(userId, { status: 'active' });
        const newSeller = new sellerModel({
            user: userId,
            fName,
            lName,
            description
        });
        await newSeller.save();
        res.status(200).json({ message: 'success', user: newSeller });

    }
    catch (e) {
        res.status(404).json({ message: 'failed', error: e });

    }

};

const getProfile = async (req, res) => {
    try {
        const id = req.params.id;
        const details = await sellerModel.findById(id).populate('user');
        if (details)
            res.status(200).json(details);
        else {
            res.status(400).json({ message: "this profile does not exist" });
        }
    }
    catch (e) {
        res.status(401).json({ error: e });
        console.log(e);
    }
}

module.exports = { createProfile, getProfile };
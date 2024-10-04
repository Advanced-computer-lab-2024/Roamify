const userModel = require('../models/userModel');

const createProfile = async (req, res) => {
    try {
        const { userName, email, password, role } = req.body;

        if (userName) {
            const result = await userModel.findOne({ userName: userName });
            if (result && userName) {
                return res.status(400).json({ error: 'username already exists' });
            }
        } //validation of username existence

        if (email) {
            const result = await userModel.findOne({ email: email });
            if (result && email) {
                return res.status(400).json({ error: 'email already exists' });
            }
        } //validation of email existence 

        const status = (role === 'tourist' || role === 'tourismGovernor') ? 'active' : 'pending';
        const newBUser = new userModel({

            userName,
            email,
            password,
            status,
            role
        });
        await newBUser.save();




        res.status(201).json({ message: 'success', user: newBUser });
    } catch (e) {
        if (e.name = 'ValidationError') {
            res.status(400).json({ message: 'invalid email' }); //testing for validity of email format
        }
        console.log(e);
    }
};

const getProfile = async (req, res) => {
    try {
        const id = req.params.id;
        const details = await userModel.findById(id);
        if (details)
            res.status(200).json(details);
        else {
            res.status(404).json({ message: 'profile does not exist' })
        }
    }
    catch (e) {
        res.status(400).json({ message: 'failed', error: e });
    }
}

module.exports = { createProfile, getProfile }; 
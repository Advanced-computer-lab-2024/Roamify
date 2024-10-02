const TourismGovernor = require("../models/tourismGovernorModel");

const addTourismGovernor = async (req, res) => {
  const { username, password } = req.body;

  try {
    const governorExists = await TourismGovernor.findOne({ username });
    if (governorExists) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const newGovernor = new TourismGovernor({
      username,
      password,
    });

    await newGovernor.save();

    res.status(201).json({
      _id: newGovernor._id,
      username: newGovernor.username,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addTourismGovernor };

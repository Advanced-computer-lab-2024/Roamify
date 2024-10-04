const userModel = require("../models/userModel");
const createUser = async (req, res) => {
  try {
    const { userName, email, password, role } = req.body;
    const status =
      role === "tourist" || role === "tourismGovernor"  ? "active" : "pending";
    const newUser = new userModel({
      userName,
      email,
      password,
      status,
      role,
    });
    await newUser.save();

    res.status(201).json({ message: "success", user: newUser });
  } catch (e) {
    console.log(e);
  }
};
const getProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const details = await userModel.findById(id);
    if (details) res.status(200).json(details);
  } catch (e) {
    res.status(400).json({ message: "failed", error: e });
  }
};
module.exports = { createUser, getProfile };

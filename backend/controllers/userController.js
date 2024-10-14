const userModel = require("../models/userModel");
const touristModel = require("../models/touristModel");
const advertiserModel = require("../models/advertiserModel");
const tourGuideModel = require("../models/tourGuideModel");
const sellerModel = require("../models/sellerModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = (_id,role) =>{
  return jwt.sign({_id,role}, process.env.SECRET,{expiresIn : '3d'});

}

const createUser = async (req, res) => {
    try{
      const { username, email, password, role } = req.body;


      //creating my user
      const user = await userModel.signUp(username,email,password,role);

      //create a token 
      const token = createToken(user._id,user.role);

      res.status(201).json({
        email:user.email,
        username:user.username
      ,token});
    }
    catch(error){
      res.status(401).json({error:error.message});
      console.log(error);
       
    }
};
const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const details = await userModel.findById(id);
    if (details) res.status(200).json(details);
  } catch (e) {
    res.status(400).json({ message: "failed", error: e });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    let user = await userModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const match =  await bcrypt.compare(password,user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const role = user.role;
    const status = user.status;
    if (role === "tourist") {
      user = await touristModel.findOne({ user: user._id }).populate('user');
      const token = createToken(user._id,user.role);
      return res.status(200).json({ email:user.user.email,username:user.user.username,token});

    }

    if (
      status === "active" &&
      role !== "tourismGovernor" &&
      role !== "admin" &&
      role !== "tourist"
    ) {
      if (role === "advertiser") {
        user = await advertiserModel
          .findOne({ user: user._id })
          .populate("user");
          const token = createToken(user.user._id,user.user.role);
          return res.status(200).json({ email:user.user.email,username:user.user.username,token});
      }

      if (role === "seller") {
        user = await sellerModel.findOne({ user: user._id });
        const token = createToken(user.user._id,user.user.role);
        return res.status(200).json({ email:user.user.email,username:user.user.username,token});
      }

      if (role === "tourGuide") {
        user = await tourGuideModel
          .findOne({ user: user._id })
          .populate("user");
          const token = createToken(user.user._id,user.user.role);
          return res.status(200).json({ email:user.user.email,username:user.user.username,token});
      }
    }
    console.log(role);

     const token = createToken(user.user._id,user.user.role);
          return res.status(200).json({ username:user.user.username,token});
  } catch (error) {
    res.status(500).json({ message: "error.message" });
  }
};

const getUsersByRole = async (req, res) => {
  try {
    const role = req.params.role;

    if (
      ![
        "admin",
        "tourist",
        "seller",
        "tourGuide",
        "advertiser",
        "tourismGovernor",
      ].includes(role)
    ) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Fetch users based on the role
    const users = await userModel.find({ role });

    // If no users are found
    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: `No users found with role ${role}` });
    }

    // Return the list of users
    res.status(200).json({
      message: `Users with role ${role} retrieved successfully`,
      users,
    });
  } catch (error) {
    console.error("Error retrieving users by role:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await userModel.findByIdAndDelete(id);
  } catch (e) {
    console.log(e.toString());
  }
};
module.exports = { createUser, getUser, loginUser, getUsersByRole, deleteUser };

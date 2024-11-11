const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const validator = require('validator');
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    idDocument: {
      url: String,           // Secure URL to access the file
      public_id: String,     // Public ID needed for deletion
    },
    additionalDocument: {
      url: String,           // Secure URL to access the file
      public_id: String,     // Public ID needed for deletion
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "pending", "pending creation", "rejected"],
      default: "pending",
    },
    role: {
      type: String,
      enum: [
        "seller",
        "advertiser",
        "tourGuide",
        "tourismGovernor",
        "tourist",
        "admin",
      ]
    },
    termsAndConditions: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

// Pre-remove hook to delete related reviews when a user is deleted
userSchema.pre('remove', async function(next) {
    try {
        if (this.role === 'tourGuide')  //when i delete a tour guide-->delete his reviews
        {
            await mongoose.model('tour guide review').deleteMany({ tourGuide: this._id });
        }
        if (this.role === 'tourist') {
            await mongoose.model('tour guide review').deleteMany({ tourist: this._id });
            await mongoose.model('activity review').deleteMany({ tourist: this._id });
            await mongoose.model('itinerary review').deleteMany({ tourist: this._id });
        }
        next();
    } catch (error) {
        next(error);
    }
});
userSchema.statics.signUp = async function (username, email, password, role) {

  if (!email || !password) {
    throw Error('All fields must be filled');
  }
  const existsEmail = await this.findOne({ email });
  const existsUsername = await this.findOne({ username });

  if (!validator.isEmail(email)) {
    throw Error('Email is not valid');
  }
  if (existsEmail) {
    throw Error('Email already in use');
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('password doesn\'t meet minimum requirements');
  }
  if (existsUsername) {
    throw Error('Username already exists');
  }

  //generate salt

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const status =
    role === "tourismGovernor" || role === "admin" ? "active" : role === "tourist" ? "pending creation" : "pending";

  return await this.create({ username, email, password: hash, status, role });

}

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;

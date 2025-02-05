const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            unique: true,
        },
        logo: {
            url: {
                type: String,
            },
            publicId: {
                type: String,
            }
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

const sellerModel = mongoose.model("seller", sellerSchema);
module.exports = sellerModel;

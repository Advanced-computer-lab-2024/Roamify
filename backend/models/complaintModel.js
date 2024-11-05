const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    incidentDate: {
        type: Date,
        required: true, // Date of the actual incident
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "resolved"],
        default: "pending",
    }
}, { timestamps: true }); // createdAt and updatedAt are automatically managed by Mongoose

const complaintModel = mongoose.model("complaint", complaintSchema);
module.exports = complaintModel;

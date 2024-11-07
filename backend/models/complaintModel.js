const mongoose = require("mongoose");
const complaintSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    status: { type: String, enum: ["pending", "resolved"], default: "pending" },
    isReplied: { type: Boolean, default: false },
    reply: {
        message: { type: String },
        date: { type: Date },
        repliedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" } // Admin ID
    }
}, { timestamps: true });

const complaintModel = mongoose.model("complaint", complaintSchema);
module.exports = complaintModel;

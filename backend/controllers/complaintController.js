const complaintModel = require("../models/complaintModel");
const touristModel = require("../models/touristModel");
const mongoose = require("mongoose");

const fileComplaint = async (req, res) => {
    try {
        const { title, body } = req.body;
        const userId = req.user._id;

        // Validate input
        if (!title || !body) {
            return res.status(400).json({ message: "Title and body are required fields." });
        }

        // Create a new complaint
        const complaint = new complaintModel({ title, body, user: userId });
        await complaint.save();

        res.status(201).json({ message: "Complaint filed successfully" });
    } catch (error) {
        console.error("Error filing complaint:", error);
        res.status(500).json({ message: "An error occurred while filing the complaint." });
    }
};
const viewComplaints = async (req, res) => {
    try {
        const { status, sortOrder } = req.query;

        let query = {};
        if (status) {
            const validStatus = ["pending", "resolved"];
            if (!validStatus.includes(status.toLowerCase())) {
                return res.status(400).json({ message: "Invalid status value. Please use 'pending' or 'resolved'." });
            }
            query.status = status.toLowerCase();
        }

        const sortOptions = sortOrder === "asc" ? { createdAt: 1 } : { createdAt: -1 };

        const complaints = await complaintModel.find(query).sort(sortOptions).select("title createdAt status user reply isReplied");

        const complaintsWithTouristData = await Promise.all(
            complaints.map(async complaint => {
                const tourist = await touristModel.findOne({ user: complaint.user }).select("firstName lastName");
                return {
                    _id: complaint._id,
                    touristName: tourist ? `${tourist.firstName} ${tourist.lastName}` : "Unknown",
                    title: complaint.title,
                    date: complaint.createdAt,
                    status: complaint.status,
                    isReplied: complaint.isReplied,
                    reply: complaint.reply ? complaint.reply.message : ""
                };
            })
        );

        res.status(200).json({
            message: "Complaints retrieved successfully",
            complaints: complaintsWithTouristData,
        });
    } catch (error) {
        console.error("Error retrieving complaints:", error);
        res.status(500).json({ message: "An error occurred while retrieving complaints." });
    }
};
const viewComplaintDesc = async (req, res) => {
    try {
        const { complaintId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(complaintId)) {
            return res.status(400).json({ message: "Invalid complaint ID format." });
        }

        const complaint = await complaintModel.findById(complaintId).select("title body status reply isReplied");
        if (!complaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }

        res.status(200).json({
            complaint: {
                ...complaint.toObject(),
                reply: complaint.reply ? complaint.reply.message : "",
                isReplied: complaint.isReplied
            }
        });
    } catch (error) {
        console.error("Error retrieving complaint details:", error);
        res.status(500).json({ message: "An error occurred while retrieving complaint details." });
    }
};
const viewMyComplaints = async (req, res) => {
    try {
        const userId = req.user._id;
        const { status } = req.query;

        let query = { user: userId };
        if (status) {
            const validStatus = ["pending", "resolved"];
            if (!validStatus.includes(status.toLowerCase())) {
                return res.status(400).json({ message: "Invalid status value. Please use 'pending' or 'resolved'." });
            }
            query.status = status.toLowerCase();
        }

        const complaints = await complaintModel.find(query).select("title createdAt status reply isReplied");
        if (complaints.length === 0) {
            return res.status(404).json({ message: "No complaints found" });
        }

        const formattedComplaints = complaints.map(complaint => ({
            _id: complaint._id,
            title: complaint.title,
            date: complaint.createdAt.toLocaleDateString("en-GB"), // Format as day/month/year
            status: complaint.status,
            isReplied: complaint.isReplied,
            reply: complaint.isReplied ? complaint.reply.message : "" // Directly include the reply message if replied
        }));

        res.status(200).json({
            message: "Complaints retrieved successfully",
            complaints: formattedComplaints
        });
    } catch (error) {
        console.error("Error retrieving my complaints:", error);
        res.status(500).json({ message: "An error occurred while retrieving your complaints." });
    }
};
const markComplaintAsResolved = async (req, res) => {
    try {
        const { complaintId } = req.params;
        const { message } = req.body;

        // Validate if complaintId is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(complaintId)) {
            return res.status(400).json({ message: "Invalid complaint ID format." });
        }

        const complaint = await complaintModel.findById(complaintId);
        if (!complaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }

        // Check if the complaint is already resolved
        if (complaint.status === "resolved") {
            return res.status(400).json({ message: "Complaint is already resolved." });
        }

        // Mark the complaint as resolved and optionally add a reply
        complaint.status = "resolved";
        if (message) {
            complaint.reply = {
                message,
                date: new Date(),
                repliedBy: req.user._id
            };
            complaint.isReplied = true;
        }

        await complaint.save();

        res.status(200).json({
            message: "Complaint marked as resolved" + (message ? " with a reply" : ""),
            complaint: {
                ...complaint.toObject(),
                isReplied: complaint.isReplied,
                reply: complaint.reply ? complaint.reply.message : ""
            }
        });
    } catch (error) {
        console.error("Error updating complaint status:", error);
        res.status(500).json({ message: "An error occurred while updating the complaint status." });
    }
};
const addOrUpdateReply = async (req, res) => {
    try {
        const { complaintId } = req.params;
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ message: "Reply message is required." });
        }

        if (!mongoose.Types.ObjectId.isValid(complaintId)) {
            return res.status(400).json({ message: "Invalid complaint ID format." });
        }

        const complaint = await complaintModel.findById(complaintId);
        if (!complaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }

        complaint.reply = {
            message,
            date: new Date(),
            repliedBy: req.user._id
        };
        complaint.isReplied = true;

        await complaint.save();

        res.status(200).json({
            message: "Reply added/updated successfully",
            complaint: {
                ...complaint.toObject(),
                isReplied: complaint.isReplied,
                reply: complaint.reply ? complaint.reply.message : ""
            }
        });
    } catch (error) {
        console.error("Error adding/updating reply:", error);
        res.status(500).json({ message: "An error occurred while adding/updating the reply." });
    }
};

module.exports = {
    fileComplaint,
    viewComplaints,
    viewComplaintDesc,
    viewMyComplaints,
    markComplaintAsResolved,
    addOrUpdateReply
};

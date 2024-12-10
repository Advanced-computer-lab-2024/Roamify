const complaintModel = require("../models/complaintModel");
const touristModel = require("../models/touristModel");
const mongoose = require("mongoose");

const fileComplaint = async (req, res) => {
  try {
    const { title, body } = req.body;

    if (!title || !body) {
      return res.status(400).json({ message: "Title and body are required fields." });
    }

    const newComplaint = new complaintModel({
      title,
      body,
      user: req.user._id,
    });

    await newComplaint.save();

    res.status(201).json({ message: "Complaint filed successfully." });
  } catch (error) {
    console.error("Error filing complaint:", error);
    res.status(500).json({ message: "Failed to file the complaint.", error: error.message });
  }
};
const viewComplaints = async (req, res) => {
  try {
    const { status, sortOrder } = req.query;

    const query = {};
    if (status) {
      const validStatus = ["pending", "resolved"];
      if (!validStatus.includes(status.toLowerCase())) {
        return res.status(400).json({ message: "Invalid status. Use 'pending' or 'resolved'." });
      }
      query.status = status.toLowerCase();
    }

    const sortOptions = sortOrder === "asc" ? { createdAt: 1 } : { createdAt: -1 };

    const complaints = await complaintModel
        .find(query)
        .sort(sortOptions)
        .select("title createdAt status user reply isReplied");

    const complaintsWithTouristData = await Promise.all(
        complaints.map(async (complaint) => {
          const tourist = await touristModel
              .findOne({ user: complaint.user })
              .select("firstName lastName");
          return {
            _id: complaint._id,
            touristName: tourist ? `${tourist.firstName} ${tourist.lastName}` : "Unknown",
            title: complaint.title,
            date: complaint.createdAt,
            status: complaint.status,
            isReplied: complaint.isReplied,
            reply: complaint.reply ? complaint.reply.message : "",
          };
        })
    );

    res.status(200).json({
      message: "Complaints retrieved successfully.",
      complaints: complaintsWithTouristData,
    });
  } catch (error) {
    console.error("Error retrieving complaints:", error);
    res.status(500).json({ message: "Failed to retrieve complaints.", error: error.message });
  }
};
const viewComplaintDesc = async (req, res) => {
  try {
    const { complaintId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(complaintId)) {
      return res.status(400).json({ message: "Invalid complaint ID format." });
    }

    const complaint = await complaintModel
        .findById(complaintId)
        .select("title body status reply isReplied");

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found." });
    }

    res.status(200).json({
      complaint: {
        ...complaint.toObject(),
        reply: complaint.reply ? complaint.reply.message : "",
      },
    });
  } catch (error) {
    console.error("Error retrieving complaint details:", error);
    res.status(500).json({ message: "Failed to retrieve complaint details.", error: error.message });
  }
};
const viewMyComplaints = async (req, res) => {
  try {
    const { status } = req.query;

    const query = { user: req.user._id };
    if (status) {
      const validStatus = ["pending", "resolved"];
      if (!validStatus.includes(status.toLowerCase())) {
        return res.status(400).json({ message: "Invalid status. Use 'pending' or 'resolved'." });
      }
      query.status = status.toLowerCase();
    }

    const complaints = await complaintModel
        .find(query)
        .select("title body createdAt status reply isReplied");

    if (complaints.length === 0) {
      return res.status(404).json({ message: "No complaints found." });
    }

    const formattedComplaints = complaints.map((complaint) => ({
      _id: complaint._id,
      title: complaint.title,
      date: complaint.createdAt.toLocaleDateString("en-GB"),
      status: complaint.status,
      isReplied: complaint.isReplied,
      reply: complaint.reply ? complaint.reply.message : "",
    }));

    res.status(200).json({
      message: "Complaints retrieved successfully.",
      complaints: formattedComplaints,
    });
  } catch (error) {
    console.error("Error retrieving my complaints:", error);
    res.status(500).json({ message: "Failed to retrieve your complaints.", error: error.message });
  }
};
const markComplaintAsResolved = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const { message } = req.body;

    if (!mongoose.Types.ObjectId.isValid(complaintId)) {
      return res.status(400).json({ message: "Invalid complaint ID format." });
    }

    const complaint = await complaintModel.findById(complaintId);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found." });
    }

    if (complaint.status === "resolved") {
      return res.status(400).json({ message: "Complaint is already resolved." });
    }

    complaint.status = "resolved";
    if (message) {
      complaint.reply = {
        message,
        date: new Date(),
        repliedBy: req.user._id,
      };
      complaint.isReplied = true;
    }

    await complaint.save();

    res.status(200).json({
      message: "Complaint resolved successfully" + (message ? " with a reply." : "."),
      complaint: {
        ...complaint.toObject(),
        reply: complaint.reply ? complaint.reply.message : "",
      },
    });
  } catch (error) {
    console.error("Error marking complaint as resolved:", error);
    res.status(500).json({ message: "Failed to resolve complaint.", error: error.message });
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
      return res.status(404).json({ message: "Complaint not found." });
    }

    complaint.reply = {
      message,
      date: new Date(),
      repliedBy: req.user._id,
    };
    complaint.isReplied = true;

    await complaint.save();

    res.status(200).json({
      message: "Reply added/updated successfully.",
      complaint: {
        ...complaint.toObject(),
        reply: complaint.reply.message,
      },
    });
  } catch (error) {
    console.error("Error adding/updating reply:", error);
    res.status(500).json({ message: "Failed to add/update reply.", error: error.message });
  }
};

module.exports = {
  fileComplaint,
  viewComplaints,
  viewComplaintDesc,
  viewMyComplaints,
  markComplaintAsResolved,
  addOrUpdateReply,
};

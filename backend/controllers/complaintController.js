const complaintModel = require("../models/complaintModel");
const touristModel=require("../models/touristModel");
const fileComplaint = async (req, res) => {
    try {
        const { title, body, incidentDate } = req.body;
        const userId = req.user._id; // Extract user ID from the authenticated request

        // Validate input
        if (!title || !body || !incidentDate) {
            return res.status(400).json({ message: "Title, body, and incident date are required fields." });
        }

        // Check if incidentDate is in the future
        const incidentDateObj = new Date(incidentDate);
        if (incidentDateObj > new Date()) {
            return res.status(400).json({ message: "Incident date cannot be in the future. Please provide a valid date." });
        }

        // Create a new complaint
        const complaint = new complaintModel({
            title,
            body,
            incidentDate,
            user: userId,
        });

        await complaint.save();

        res.status(201).json({
            message: "Complaint filed successfully",
        });
    } catch (error) {
        console.error("Error filing complaint:", error);
        res.status(500).json({ message: "An error occurred while filing the complaint. Please try again later." });
    }
};

const viewComplaints = async (req, res) => {
    try {
        const { status, sortOrder } = req.query;

        // Build query object for optional filtering by status
        let query = {};
        if (status) {
            if (["pending", "resolved"].includes(status.toLowerCase())) {
                query.status = status.toLowerCase();
            } else {
                return res.status(400).json({ message: "Invalid status value. Please use 'pending' or 'resolved'." });
            }
        }

        // Set sorting order by createdAt date (default to descending)
        const sortOptions = sortOrder === "asc" ? { createdAt: 1 } : { createdAt: -1 };

        // Retrieve complaints with filtering and sorting applied
        const complaints = await complaintModel.find(query).sort(sortOptions).select("title createdAt status user");

        // For each complaint, directly fetch the tourist data based on the user ID
        const complaintsWithTouristData = await Promise.all(
            complaints.map(async complaint => {
                const tourist = await touristModel.findOne({ user: complaint.user }).select("firstName lastName");

                return {
                    _id: complaint._id,
                    touristName: tourist ? `${tourist.firstName} ${tourist.lastName}` : "Unknown",
                    title: complaint.title,
                    date: complaint.createdAt,
                    status: complaint.status,
                };
            })
        );

        res.status(200).json({
            message: "Complaints retrieved successfully",
            complaints: complaintsWithTouristData,
        });
    } catch (error) {
        console.error("Error retrieving complaints:", error);
        res.status(500).json({ message: "An error occurred while retrieving complaints. Please try again later." });
    }
};
const viewComplaintDesc = async (req, res) => {
    try {
        const { complaintId } = req.params;

        // Find the complaint by ID
        const complaint = await complaintModel.findById(complaintId).select("body");
        if (!complaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }
        res.status(200).json({
            body: complaint.body,
        });
    } catch (error) {
        console.error("Error retrieving complaint details:", error);
        res.status(500).json({ message: "An error occurred while retrieving the complaint details. Please try again later." });
    }
};


module.exports = { fileComplaint, viewComplaints , viewComplaintDesc };

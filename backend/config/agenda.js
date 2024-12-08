const Agenda = require("agenda");
const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel");
const mongoose = require("mongoose");

const agenda = new Agenda({
    db: {
        address: process.env.MONGO_URI,
        collection: "agendaJobs",
    },
});

// Define the "expire order" job
agenda.define("expire order", async (job) => {
    const { orderId } = job.attrs.data;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const order = await orderModel.findById(orderId).session(session);
        if (!order || order.status !== "Pending") {
            await session.abortTransaction();
            session.endSession();
            return;
        }

        const bulkOps = order.products.map((item) => ({
            updateOne: {
                filter: { _id: item.productId },
                update: { $inc: { quantity: item.quantity } },
            },
        }));
        await productModel.bulkWrite(bulkOps, { session });

        order.status = "Cancelled";
        await order.save({ session });

        await session.commitTransaction();
        session.endSession();
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error("Failed to expire order:", error.message);
    }
});

// Function to handle startup recovery
const startupRecovery = async () => {
    try {
        console.log("Recovering server state...");
        const pendingOrders = await orderModel.find({ status: "Pending" });

        for (const order of pendingOrders) {
            if (!order.expirationJobId) {
                const job = await agenda.schedule("in 10 minutes", "expire order", {
                    orderId: order._id.toString(),
                });
                order.expirationJobId = job.attrs._id;
                await order.save();
            }
        }
        console.log("Recovery process completed!");
    } catch (error) {
        console.error("Error during startup recovery:", error.message);
    }
};

module.exports = {agenda};
module.exports.startupRecovery = startupRecovery;

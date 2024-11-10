const cron = require("node-cron");
const touristModel = require("../models/touristModel");
const receiptModel = require("../models/receiptModel");
const activityTicketsModel = require("../models/activityTicketModel");
const itineraryTicketsModel = require("../models/itineraryTicketModel");
const transportationModel = require("../models/transportationModel");

const updatePoints = () => {
    cron.schedule("30 12 * * *", async () => {  // Runs at 7:40 PM Cairo time
        console.log('----------------------------UPDATE-POINTS----------------------');
        let addPoints = 0
        let userId = null

        try {
            const receipts = await receiptModel.find({ status: 'successfull' });
            // Get the current date and time
            const now = new Date();

            // Find all transportations with a date earlier than the current date and time
            const transportations = await transportationModel.find({ date: { $lt: now }, pointsRedeemed: false }); const today = new Date();
            today.setHours(0, 0, 0, 0); // Set to midnight for date-only comparison

            for (const receipt of receipts) {
                // Check activity tickets
                const activityTicket = await activityTicketsModel
                    .findOne({ receipt: receipt._id, status: 'active', pointsRedeemed: false })
                    .populate('activity');
                console.log('activity:', activityTicket)

                if (activityTicket) {
                    const eventDate = new Date(activityTicket.activity.date);
                    eventDate.setHours(0, 0, 0, 0);

                    if (today > eventDate) {
                        console.log('updating activity Points')
                        userId = activityTicket.tourist
                        const tourist = await touristModel.findOne({ user: activityTicket.tourist });
                        const level = tourist.level;
                        addPoints = level === 1 ? 0.5 * receipt.price : level === 2 ? receipt.price : receipt.price * 1.5;

                        console.log(`Old Points for Tourist ID ${tourist._id}:`, tourist.points);
                        tourist.points += addPoints;
                        await tourist.save();
                        console.log(`Updated Points for Tourist ID ${tourist._id}:`, tourist.points);
                        activityTicket.pointsRedeemed = true;
                        await activityTicket.save();

                        const pointsReceipt = new receiptModel({
                            type: 'points redemption',
                            status: 'successfull',
                            tourist: activityTicket.tourist,
                            price: addPoints,
                            receiptType: 'refund'
                        })

                        await pointsReceipt.save();
                    }
                }

                // Check itinerary tickets
                const itineraryTicket = await itineraryTicketsModel.findOne({ receipt: receipt._id, status: 'active', pointsRedeemed: false });

                console.log(itineraryTicket)
                if (itineraryTicket) {
                    const eventDate = new Date(itineraryTicket.date);
                    eventDate.setHours(0, 0, 0, 0);

                    if (today > eventDate) {
                        console.log('updating itineraryPoints')
                        userId = itineraryTicket.tourist
                        const tourist = await touristModel.findOne({ user: itineraryTicket.tourist });
                        const level = tourist.level;
                        addPoints = level === 1 ? 0.5 * receipt.price : level === 2 ? receipt.price : receipt.price * 1.5;

                        console.log(`Old Points for Tourist ID ${tourist._id}:`, tourist.points);
                        tourist.points += addPoints;
                        await tourist.save();
                        itineraryTicket.pointsRedeemed = true
                        console.log(`Updated Points for Tourist ID ${tourist._id}:`, tourist.points);
                        await itineraryTicket.save();
                        const pointsReceipt = new receiptModel({
                            type: 'points redemption',
                            status: 'successfull',
                            tourist: itineraryTicket.tourist,
                            price: addPoints,
                            receiptType: 'refund'
                        })

                        await pointsReceipt.save();

                    }
                }
            }

            if (transportations.length > 0) {
                for (const transportation of transportations) {
                    for (const touristId of transportation.touristsBooked) {
                        const tourist = await touristModel.findOne({ user: touristId });
                        userId = touristId
                        const level = tourist.level;
                        addPoints = level === 1 ? 0.5 * transportation.price : level === 2 ? transportation.price : transportation.price * 1.5;

                        console.log(`Old Points for Tourist ID ${tourist._id}:`, tourist.points);
                        tourist.points += addPoints;
                        await tourist.save();
                        transportation.pointsRedeemed = true
                        console.log(`Updated Points for Tourist ID ${tourist._id}:`, tourist.points);
                        await transportation.save();
                        const pointsReceipt = new receiptModel({
                            type: 'points redemption',
                            status: 'successfull',
                            tourist: touristId,
                            price: addPoints,
                            receiptType: 'refund'
                        })

                        await pointsReceipt.save();
                    }
                }
            }
        } catch (error) {
            console.error("Error updating points:", error);
            const pointsReceipt = new receiptModel({
                type: 'points redemption',
                status: 'failed',
                tourist: userId,
                price: addPoints,
                receiptType: 'refund'
            })

            await pointsReceipt.save();
        }
    }, {
        timezone: "Africa/Cairo"
    });
};
const setLevel = () => {
    cron.schedule("17 20 * * *", async () => { // Runs on the first day of every month at midnight
        console.log('------------------RESETTING POINTS------------------');
        try {
            const tourists = await touristModel.find();
            if (tourists) {
                for (const tourist of tourists) {
                    if (tourist.points <= 100000) {
                        tourist.level = 1;
                    } else if (tourist.points > 100000 && tourist.points <= 500000) {
                        tourist.level = 2;
                    } else if (tourist.points > 500000) {
                        tourist.level = 3;
                    }

                    await tourist.save();
                    console.log(`Tourist ID: ${tourist._id} updated to level ${tourist.level}`);
                }
            }
        } catch (error) {
            console.error("Error updating tourist levels:", error);
        }
    });
};

module.exports = { updatePoints, setLevel };

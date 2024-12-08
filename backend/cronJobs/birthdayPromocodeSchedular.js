const nodemailer = require('nodemailer');
const touristModel = require('../models/touristModel');
const promoCodeModel = require('../models/promoCodeModel');
require('dotenv').config();

// Generate a unique promo code
const generatePromoCode = (firstName, lastName) => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000).toString();
    return `${firstName.toUpperCase()}-${lastName.toUpperCase()}-${randomSuffix}`;
};

// Email transporter setup
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});
const sendBirthdayPromoCodes = async () => {
    try {
        console.log("Running birthday promo code job...");

        // Get today's month and day
        const today = new Date();
        const todayMonth = today.getUTCMonth() + 1; // Months are zero-based
        const todayDay = today.getUTCDate();

        // Use MongoDB aggregation to find tourists with a birthday today
        const tourists = await touristModel.aggregate([
            {
                $addFields: {
                    birthMonth: { $month: "$dateOfBirth" },
                    birthDay: { $dayOfMonth: "$dateOfBirth" }
                }
            },
            {
                $match: {
                    birthMonth: todayMonth,
                    birthDay: todayDay
                }
            },
            {
                $lookup: {
                    from: "users", // The name of the users collection
                    localField: "user",
                    foreignField: "_id",
                    as: "userDetails"
                }
            },
            {
                $unwind: "$userDetails"
            }
        ]);

        if (tourists.length === 0) {
            console.log("No tourists have a birthday today.");
            return;
        }

        // Generate promo codes and send emails
        for (const tourist of tourists) {
            const email = tourist.userDetails.email;
            if (!email) {
                console.log(`No email found for tourist: ${tourist.firstName} ${tourist.lastName}`);
                continue;
            }

            const code = `${tourist.firstName}_${Math.floor(Math.random() * 10000)}`.toUpperCase();
            const expiryDate = new Date();
            expiryDate.setFullYear(expiryDate.getFullYear() + 1); // Set expiry date to 1 year from today

            const promoCode = new promoCodeModel({
                code,
                discountPercentage: 10, // Example discount percentage
                expiryDate,
                isActive: true,
                createdBy: null, // System-generated
                usesLeft: 1,
            });

            await promoCode.save();

            // Send email to tourist
            const transporter = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_PASSWORD,
                },
            });

            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: "Happy Birthday! 🎉 Here's a Promo Code Just for You",
                text: `Happy Birthday, ${tourist.firstName}!\n\nEnjoy this exclusive promo code just for you: ${code}. Use it on your next purchase and get a special discount. The code is valid until ${expiryDate.toDateString()}.\n\nBest wishes,\nRoamify`,
            };

            await transporter.sendMail(mailOptions);

            console.log(`Promo code ${code} sent to ${tourist.firstName} (${email})`);
        }
    } catch (error) {
        console.error("Error in sending birthday promo codes:", error.message);
    }
};


module.exports = sendBirthdayPromoCodes;

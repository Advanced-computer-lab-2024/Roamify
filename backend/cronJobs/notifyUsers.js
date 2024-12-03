const userModel = require('../models/userModel')
const activityTicketModel = require('../models/activityTicketModel')
const itineraryTicketModel = require('../models/itineraryTicketModel')
const notificationModel = require('../models/notificationModel')
const nodemailer = require('nodemailer')
const emailTemplate = require('../emailTemplate')

const emailUser = async () => {
    try {
        const activityTickets = await activityTicketModel.find({ status: 'active', date: { $gt: new Date() } })
        const itineraryTickets = await itineraryTicketModel.find({ status: 'active', date: { $gt: new Date() } })
        if (activityTickets.length === 0 && itineraryTickets.length === 0) {
            console.log('no upcoming booked activities or itineraries')
            return
        }

        console.log('-----------------------NOTIFYING USERS-------------------------------')

        for (t of activityTickets) {
            const dateDifference = (new Date(t.date).setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24)
            if (dateDifference !== 1) break;


            else {

                const user = await userModel.findById(t.tourist)

                const transporter = nodemailer.createTransport({
                    service: "Gmail",
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.EMAIL_PASSWORD,
                    }
                })
                const text = emailTemplate.reminderForActivity(t.name, t.date, t.locationName, user.username)
                const mailOptions = {
                    from: process.env.EMAIL,
                    to: user.email,
                    subject: " Reminder: Your Upcoming Activity Tomorrow!",
                    text
                }
                await transporter.sendMail(mailOptions)
            }


        }

        for (t of itineraryTickets) {
            const dateDifference = (new Date(t.date).setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24)
            console.log(dateDifference)
            if (dateDifference !== 1) break;

            else {

                const user = await userModel.findById(t.tourist)

                const transporter = nodemailer.createTransport({
                    service: "Gmail",
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.EMAIL_PASSWORD,
                    }
                })

                const text = emailTemplate.reminderForItinerary(t.name, t.date, user.username)
                const mailOptions = {
                    from: process.env.EMAIL,
                    to: user.email,
                    subject: " Reminder: Your Upcoming itinerary Tomorrow!",
                    text
                }
                await transporter.sendMail(mailOptions)
            }


        }



    }
    catch (error) {
        console.log(error)
    }
}

module.exports = emailUser 
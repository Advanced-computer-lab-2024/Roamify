const nodemailer = require('nodemailer')
const userModel = require('../models/userModel')
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');


const sendOtp = async (req, res) => {
    try {
        const email = req.body.email;
        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User with this email does not exist" });
        }


        if (user.status !== 'active') return res.status(403).json({ message: 'you are unauthorized to do tis action' })

        if (user.otp && user.otpExpires > Date.now()) throw Error('OTP has been already sent please check your mail')

        //3 steps to create an otp
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.otp = otp
        user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes from now    
        await user.save()

        // Send the OTP via email
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
            subject: "Your OTP Code",
            text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ message: 'sent otp successfully', userId: user._id })

    }
    catch (error) {

        console.log(error)
        return res.status(500).json({ message: error.message })
    }
}

const checkOtp = async (req, res) => {
    try {
        const user = await userModel.findById(req.body.userId)

        if (!user) throw Error('error user does not exist')

        if (user.status !== 'active' || !user.otp) return res.status(403).json({ message: 'you are unauthorized to do this action' })


        if (!req.body.otp || req.body.length < 6) throw Error('please insert otp ')


        if (req.body.otp === user.otp) {
            if (Date.now() <= user.otpExpires) {
                const id = user._id
                const token = jwt.sign({ id }, process.env.SECRET, { expiresIn: '15m' })
                user.otp = null;
                user.otpExpires = null;
                await user.save();
                res.cookie('resetToken', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 15 * 60 * 1000, // 15 minutes
                });

                return res.status(200).json({ message: 'OTP verified. You can now reset your password.' });
            } else {
                return res.status(400).json({ message: 'Expired OTP' });
            }
        } else {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const changePassword = async (req, res) => {
    try {
        if (!req.cookies.resetToken) throw Error('Access denied')

        let decoded;
        // Decode the token
        try {
            decoded = jwt.verify(req.cookies.resetToken, process.env.SECRET);

        }
        catch (e) {
            return res.status(401).json({ message: 'invalid token' })
        }
        const user = await userModel.findById(decoded.id)

        const { password, confirmedPassword } = req.body

        if (!password || !confirmedPassword) throw Error('please enter your new password and confirm it')
        if (password !== confirmedPassword) throw Error('passwords does not match')
        if (!validator.isStrongPassword(password)) {
            throw Error('password doesn\'t meet minimum requirements');
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        user.password = hash;

        await user.save();
        res.clearCookie('resetToken', {
            httpOnly: true, // Match the settings used when the cookie was set
            secure: process.env.NODE_ENV === 'production', // Ensure secure in production
            sameSite: 'Strict', // Match the sameSite setting if used
        });
        return res.status(200).json({ message: 'changed password successfully' })
    }
    catch (error) {

        console.log(error)
        return res.status(500).json({ message: error.message })
    }
}

module.exports = { sendOtp, checkOtp, changePassword }
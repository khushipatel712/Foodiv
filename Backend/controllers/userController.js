const bcrypt = require('bcryptjs');
const Admin = require('../Models/adminModel');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const path=require('path');
const User = require('../Models/User');

// Temporary in-memory storage for OTPs
const otpStore = {};
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});


exports.registeruser = async (req, res) => {
    const { fullName , email } = req.body;
    try {
        // Generate OTP
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        console.log('Generated OTP:', otp);

        otpStore[email] = otp;

        console.log(otpStore)

        // Create email body
        const emailBody = `
            <p>Dear User,</p>
            <p>Your OTP code is: <strong>${otp}</strong></p>
            <p>If you did not request this, please ignore this email.</p>
        `;

        // Send OTP email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Registration OTP',
            html: emailBody,
        });

        res.status(200).json({ message: 'OTP sent to email' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ message: 'Error sending OTP', error });
    }
};

exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
   console.log(email,otp)
   console.log(otpStore[email])
    try {

        if (!otpStore[email] || otpStore[email] !== otp) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }
      
        delete otpStore[email]; 

        res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ message: 'Error verifying OTP', error });
    }
};

exports.setPassword = async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate passwords
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Update user password
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password set successfully' });
    } catch (error) {
        console.error('Error setting password:', error);
        res.status(500).json({ message: 'Error setting password', error });
    }
};
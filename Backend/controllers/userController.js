const bcrypt = require('bcryptjs');
// const Admin = require('../Models/adminModel');
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
    const { fullName, email } = req.body;

    try {
        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Generate OTP
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        console.log('Generated OTP:', otp);

        // Store OTP in a temporary store (e.g., in-memory store, or consider using a more persistent store)
        otpStore[email] = otp;
        console.log(otpStore);

        // Create email body
        const emailBody = `
            <p>Dear ${fullName},</p>
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
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Error during registration', error });
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

exports.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const { adminId } = req.params; // Extract adminId from request parameters

        // Validate input
        if (!name || !email || !password || !adminId) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            adminId // Include adminId when creating the user
        });

        // Save the user to the database
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign(
            { id: newUser._id, email: newUser.email },
            process.env.JWT_SECRET, // Use your JWT secret
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        // Return the created user (without the password) and JWT token
        return res.status(201).json({
            message: 'User created successfully',
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};



exports.login = async (req, res) => {
    const { adminId } = req.params; // Get adminId from URL parameters
    const { email, password } = req.body; // Get email and password from request body
  
    try {
      // Find the user by adminId and email
      const user = await User.findOne({ adminId, email }); // Adjust query to match your schema
      
      // Check if user exists and the password matches
      if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      // Generate the token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '20h' });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
const bcrypt = require('bcryptjs');
const User = require('../Models/adminModel');
const jwt = require('jsonwebtoken');


const otpStore={};
// Middleware for hashing password before saving
const hashPassword = async (req, res, next) => {
    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        next();
    } catch (error) {
        res.status(500).json({ message: 'Error hashing password' });
    }
};

// Middleware for comparing password
const comparePassword = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        req.user = user; // Pass user info to next middleware or controller
        next();
    } catch (error) {
        res.status(500).json({ message: 'Error comparing password' });
    }
};

// Middleware for verifying OTP
// Middleware for verifying OTP
const verifyOTPs = (req, res, next) => {
    try {
        const { email, otp } = req.body;
        const cleanedEmail = email.trim().toLowerCase();
        const storedOTP = otpStore[cleanedEmail];

        // Debugging: Log stored OTP and incoming OTP for comparison
        console.log(`Stored OTP for ${cleanedEmail}: ${storedOTP}`);
        console.log(`Received OTP: ${otp}`);

        if (storedOTP && storedOTP === otp) {
            delete otpStore[cleanedEmail]; // Clear OTP after successful verification
            next(); // Proceed to the next middleware or route handler
        } else {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }
    } catch (error) {
        console.error('Error during OTP verification:', error);
        res.status(400).json({ message: 'Error verifying OTP', error });
    }
};

const authenticateToken = (req, res, next) => {
 
    const token = req.headers['authorization'];

    if (!token) return res.sendStatus(401); // No token provided, unauthorized

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.error('JWT Error:', err); // Log error for debugging
        return res.sendStatus(403); // Forbidden if token is invalid
      }
      req.user = user;
      next(); // Token is valid, proceed to the next middleware
    });
};




module.exports = { hashPassword, comparePassword, verifyOTPs , otpStore, authenticateToken };

const bcrypt = require('bcryptjs');
const Admin = require('../Models/adminModel');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const path=require('path');



// Temporary in-memory storage for OTPs
const otpStore = {};

// Set up the email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Register and send OTP
exports.register = async (req, res) => {
    const { restaurantName, country, mobileNumber, countryCode, email, password } = req.body;
   
    // console.log('Email received:', email);
    // console.log('Password received:', password);


    try {
        // Generate OTP
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        console.log('Generated OTP:', otp);

        otpStore[email] = otp;

        // console.log(otpStore)

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
            subject: 'Foodiv Registration OTP',
            html: emailBody,
        });

        res.status(200).json({ message: 'OTP sent to email' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ message: 'Error sending OTP', error });
    }
};

// Verify OTP and register user
exports.verifyOTP = async (req, res) => {
    const { email, otp, restaurantName, country, mobileNumber, countryCode, password } = req.body;

    // console.log('Received OTP:', otp);
    // console.log('Received Email:', email);
    // console.log(otpStore)

    try {
        // Verify OTP
        if (!otpStore[email] || otpStore[email] !== otp) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }
        delete otpStore[email]; // Remove OTP after successful verification

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save new user
        const user = new Admin({
            restaurantName,
            country,
            mobileNumber,
            countryCode,
            email,
            password: hashedPassword,
        });
        await user.save();

        // const token = jwt.sign({ id: admin._id }, 'your-secret-key', { expiresIn: '1d' });

        
        // res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict' });
      

        res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user', error });
    }
};

// Login user
    exports.login= async (req, res) => {
        const { email, password } = req.body;
      
        try {
          const admin = await Admin.findOne({ email });
          if (!admin || !await bcrypt.compare(password, admin.password)) {
            return res.status(401).json({ message: 'Invalid credentials' });
          }
      
          const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '20h' });
          res.json({ token });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      };


// Fetch Profile Route
// exports.profile= async (req, res) => {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) return res.status(401).json({ message: 'Unauthorized' });
  
//     try {
//       const decoded = jwt.verify(token, JWT_SECRET);
//       const admin = await Admin.findById(decoded.id);
//       if (!admin) return res.status(404).json({ message: 'User not found' });
  
//       res.json(admin);
//     } catch (err) {
//       res.status(401).json({ message: 'Invalid token' });
//     }
//   };

exports.getProfile=async (req, res) => {
    try {
        const user = await Admin.findById(req.user.id); // Adjust according to your auth setup

        if (!user) return res.sendStatus(404); // Not Found

        // Construct the full URL to the image
        const imageUrl = user.image ? `http://localhost:5001/images/${path.basename(user.image)}` : null;

        res.json({
            id:user._id,
            restaurantName: user.restaurantName,
            email: user.email,
            mobileNumber: user.mobileNumber,
            state: user.state,
            area: user.area,
            city: user.city,
            address: user.address,
            latitude: user.latitude,
            longitude: user.longitude,
            domain: user.domain,
            image: imageUrl // Add image URL to the response
        });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

  
  exports.updateProfile = async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        console.log('Request File:', req.file);

        const { restaurantName, country, mobileNumber, countryCode, email, state, area, city, address, latitude, longitude, domain, image } = req.body;

        // Check if required fields are provided
        if (!email || !mobileNumber) {
            return res.status(400).json({ message: 'Email and mobile number are required.' });
        }

        const user = await Admin.findById(req.user.id);

        if (!user) return res.sendStatus(404); // Not Found

        user.restaurantName = restaurantName || user.restaurantName;
        user.country = country || user.country;
        user.mobileNumber = mobileNumber || user.mobileNumber;
        user.countryCode = countryCode || user.countryCode;
        user.email = email || user.email;
        user.state = state || user.state;
        user.area = area || user.area;
        user.city = city || user.city;
        user.address = address || user.address;
        user.latitude = latitude || user.latitude;
        user.longitude = longitude || user.longitude;
        user.domain = domain || user.domain;

        if (req.file) {
            user.image = req.file.path; // Store image path
        }

        await user.save();
        res.json(user);
    } catch (error) {
        console.error('Error in updateProfile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateStatus = async (req, res) => {
    try {
        const adminId = await Admin.findById(req.user.id);
  
  
      const admin = await Admin.findById(adminId);
  
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }
  
      // Toggle the online status
      admin.online = !admin.online;
      await admin.save();


   
      res.status(200).json({ online: admin.online });
    } catch (error) {
     
      console.error('Error updating status:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

  exports.getProfileById = async (req, res) => {
    const { id } = req.params; // Get restaurantId from route params

    try {
        const user = await Admin.findById(id); // Find user by restaurantId

        if (!user) return res.sendStatus(404); // Not Found

        // Construct the full URL to the image
        const imageUrl = user.image ? `http://localhost:5001/images/${path.basename(user.image)}` : null;

        res.json({
            id: user._id,
            restaurantName: user.restaurantName,
            email: user.email,
            mobileNumber: user.mobileNumber,
            state: user.state,
            area: user.area,
            city: user.city,
            address: user.address,
            latitude: user.latitude,
            longitude: user.longitude,
            domain: user.domain,
            image: imageUrl // Add image URL to the response
        });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

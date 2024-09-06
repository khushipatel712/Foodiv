const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SuperAdmin = require('../Models/SuperAdmin');


const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const admin = await SuperAdmin.findOne({ email });
  
      if (!admin) {
        return res.status(401).json({ message: 'Invalid email' });
      }
  
      const isMatch = await bcrypt.compare(password, admin.password);
  
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      const superadmintoken = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '10h' });
  
      res.status(200).json({ message: 'Login successful', superadmintoken });
  
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };


  const registerAdmin = async (req, res) => {
    const { email, password } = req.body;
    
    try {
      // Check if email already exists
      const existingAdmin = await SuperAdmin.findOne({ email });
      if (existingAdmin) {
        return res.status(400).json({ message: 'Email already exists' });
      }
  
      // Check if an image was uploaded
      let image = '';
      if (req.file) {
        image = req.file.path; // Get the path of the uploaded image
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new admin
      const newAdmin = new SuperAdmin({
        email,
        password: hashedPassword,
        image, // Store the image path in the admin's document
      });
  
      // Save the admin to the database
      await newAdmin.save();
  
      res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  

  const getAdmin = async (req, res) => {
    try {
      // Find the admin by the email stored in the JWT (req.user is populated by the authenticateToken middleware)
      const admin = await SuperAdmin.findOne({ email: req.user.email });
  
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }
  
      // Check if an image is available, and construct the image URL
      const imageUrl = admin.image 
        ? `${req.protocol}://${req.get('host')}/${admin.image}` // use the relative path stored in DB
        : null;
  
      // Return the admin data (excluding sensitive information like password)
      const { email, createdAt } = admin;
      res.status(200).json({ email, image: imageUrl, createdAt });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };


const updateAdmin = async (req, res) => {
  try {
    // Find the admin by the email stored in the JWT (req.user is populated by the authenticateToken middleware)
    const admin = await SuperAdmin.findOne({ email: req.user.email });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Update the email if provided
    if (req.body.email) {
      admin.email = req.body.email;
    }

    // Update the image if a new one is uploaded
    if (req.file) {
      // Check if there's an existing image and delete it
      if (admin.image) {
        const oldImagePath = path.join(__dirname, '..', admin.image); // Construct the old image path
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath); // Delete the old image
        }
      }

      // Save the new image path
      admin.image = `public/images/${req.file.filename}`;
    }

    // Save the updated admin data
    await admin.save();

    // Construct the image URL to return in the response
    const imageUrl = admin.image 
      ? `${req.protocol}://${req.get('host')}/${admin.image}` 
      : null;

    // Return the updated admin data (excluding sensitive information like password)
    res.status(200).json({ 
      email: admin.email, 
      image: imageUrl, 
      message: 'Admin updated successfully' 
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

  

  module.exports={loginAdmin, registerAdmin, getAdmin, updateAdmin}
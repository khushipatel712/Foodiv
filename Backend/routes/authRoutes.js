const express = require('express');
const router = express.Router();
const { register, verifyOTP, login, getProfile, updateProfile, updateStatus} = require('../controllers/authController');
const {authenticateToken} = require('../middlewares/authMiddleware');
const upload = require('../config/multerConfig');


const multer = require('multer');


// Route to send OTP for registration
router.post('/register',upload.none(), register);

// Route to verify OTP and complete registration
router.post('/verify-otp',upload.none(), verifyOTP);

// Route to log in
router.post('/login',upload.none(), login);

router.get('/profile', authenticateToken, getProfile);

// Update profile details
router.put('/profile', authenticateToken, upload.single('image'), updateProfile);

router.put('/update-status',authenticateToken, updateStatus);

module.exports = router;

const express = require('express');
const router = express.Router();
const { registeruser, verifyOTP, createUser, login} = require('../controllers/userController');
// const {authenticateToken} = require('../middlewares/authMiddleware');
const upload = require('../config/multerConfig');


const multer = require('multer');



router.post('/registeruser',upload.none(), registeruser);


router.post('/verify-otpuser',upload.none(), verifyOTP);

router.post('/createuser/:adminId',upload.none(), createUser);

// // Route to log in
router.post('/user/login/:adminId',upload.none(), login);

// router.get('/profile', authenticateToken, getProfile);

// router.get('/profilebyid/:id',  getProfileById);

// // Update profile details
// router.put('/profile', authenticateToken, upload.single('image'), updateProfile);

// router.put('/update-status',authenticateToken, updateStatus);

module.exports = router;

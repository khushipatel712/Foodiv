const express = require('express');
const router = express.Router();
const { registeruser, verifyOTP, createUser, login, getUser, logout} = require('../controllers/userController');
const {authenticateToken} = require('../middlewares/authMiddleware');
const upload = require('../config/multerConfig');


const multer = require('multer');



router.post('/registeruser',upload.none(), registeruser);


router.post('/verify-otpuser',upload.none(), verifyOTP);

router.post('/createuser/:adminId',upload.none(), createUser);

// // Route to log in
router.post('/user/login/:adminId',upload.none(), login);

router.get('/user/get/:adminId', authenticateToken, getUser);

// router.get('/profilebyid/:id',  getProfileById);

router.get('/user/logout', logout);

// // Update profile details
// router.put('/profile', authenticateToken, upload.single('image'), updateProfile);

// router.put('/update-status',authenticateToken, updateStatus);

module.exports = router;

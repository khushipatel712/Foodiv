const express = require('express');
const router = express.Router();
const { loginAdmin, registerAdmin, getAdmin, updateAdmin} = require('../controllers/superAdminController');
const {authenticateToken} = require('../middlewares/authMiddleware');
const upload = require('../config/multerConfig');


router.post('/superadmin/register',upload.single('image'), registerAdmin);


router.post('/superadmin/login',upload.none(), loginAdmin);

router.get('/superadmin/get', authenticateToken, getAdmin);

router.put('/superadmin/update', authenticateToken, upload.single('image'), updateAdmin);


module.exports = router;

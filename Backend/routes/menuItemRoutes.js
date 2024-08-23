const express = require('express');
const router = express.Router();
const menuItemController = require('../controllers/menuItemController');
const upload = require('../config/multerConfig'); // Assuming you're using multer for file uploads

// Create a new menu item
router.post('/menu-items', upload.single('image'), menuItemController.createMenuItem);

// Get all menu items
router.get('/menu-items', menuItemController.getAllMenuItems);

// Get a menu item by ID
router.get('/menu-items/:id', menuItemController.getMenuItemById);

// Update a menu item by ID
router.put('/menu-items/:id', upload.single('image'), menuItemController.updateMenuItem);

// Delete a menu item by ID
router.delete('/menu-items/:id', menuItemController.deleteMenuItem);

router.put('/menu-items/update/:id', menuItemController.updateStatus1);


router.get('/menu-items/admin/:adminId', menuItemController.getMenuItemByAdminId);

module.exports = router;

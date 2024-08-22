const express = require('express');
const { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory, updateStatus } = require('../controllers/categoryController');
const upload = require('../config/multerConfig'); // Assuming you have multer configured in this file

const router = express.Router();

// Create a new category
router.post('/categories', upload.single('image'), createCategory);

// Get all categories
router.get('/categories', getCategories);

// Get a specific category by ID
router.get('/categories/:id', getCategoryById);

// Update a category
router.put('/categories/:id', upload.single('image'), updateCategory);

// Delete a category
router.delete('/categories/:id', deleteCategory);

router.put('/update/:id', updateStatus);


module.exports = router;

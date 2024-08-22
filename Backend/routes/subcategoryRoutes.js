const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig'); // Ensure multer configuration is correct
const { createSubcategory, updateSubcategory, deleteSubcategory, getAllSubcategories, getSubcategoryById, getSubcategory } = require('../controllers/subcategoryController');

// Route to create a new subcategory
router.post('/subcategory', upload.single('image'), createSubcategory);

// Route to update a subcategory by ID
router.put('/subcategory/:id', upload.single('image'), updateSubcategory);

// Route to delete a subcategory by ID
router.delete('/subcategory', deleteSubcategory); // Accept form data from body

// Route to get all subcategories
router.get('/subcategory', getAllSubcategories);

// Route to get a subcategory by ID
router.get('/subcategory/:id', getSubcategoryById);

router.get('/subcategories/:categoryId', getSubcategory );

module.exports = router;

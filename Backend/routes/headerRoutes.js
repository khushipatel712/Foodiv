const express = require('express');
const upload =require('../config/multerConfig')
const path = require('path');
const HeaderController = require('../controllers/headerController');
const router = express.Router();

router.post('/', upload.single('logo'), HeaderController.createHeader);

// Get all headers
router.get('/', HeaderController.getHeader);

// Get a single header by ID
router.get('/:id', HeaderController.getHeaderById);

// Update a header
router.put('/', upload.single('logo'), HeaderController.updateHeader);

// Delete a header
router.delete('/:id', HeaderController.deleteHeader);

module.exports = router;
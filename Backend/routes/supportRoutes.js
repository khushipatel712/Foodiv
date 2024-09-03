// routes/supportRoutes.js
const express = require('express');
const router = express.Router();
const supportController = require('../controllers/supportController');

// Create a new support entry
router.post('/:adminId', supportController.createSupport);

// Get all support entries for an admin
router.get('/:adminId', supportController.getSupportsByAdmin);

// Update a support entry
router.put('/:adminId/:id', supportController.updateSupport);

// Delete a support entry
router.delete('/:adminId/:id', supportController.deleteSupport);

module.exports = router;

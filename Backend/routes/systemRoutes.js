// routes/systemRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const systemController = require('../controllers/systemController');

// Create a new system
router.post('/', upload.single('image'), systemController.createSystem);

// Get all systems
router.get('/', systemController.getAllSystems);

// Get a single system by ID
router.get('/:slug', systemController.getSystemBySlug);

// Update a system with image upload
router.put('/:slug', upload.single('image'), systemController.updateSystem);

// Delete a system
router.delete('/:slug', systemController.deleteSystem);

module.exports = router;

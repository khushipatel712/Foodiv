const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');

// Get all content
router.get('/content', contentController.getAllContent);

// Get content by ID
router.get('/content/:id', contentController.getContentById);

// Create new content
router.post('/content', contentController.createContent);

// Update content by ID
router.put('/content/:id', contentController.updateContent);

// Delete content by ID
router.delete('/content/:id', contentController.deleteContent);

router.get('/content/system/:slug', contentController.getContentBySystemSlug);

router.put('/content/system/:slug', contentController.updateContentBySystemSlug);

router.delete('/content/system/:slug', contentController.deleteContentBySystemSlug);

module.exports = router;

// routes/faqRoutes.js
const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqController'); // Adjust the path as needed

// Get all FAQs
router.get('/faqs', faqController.getAllFaqs);

// Add a new FAQ
router.post('/faqs', faqController.addFaq);

// Update an FAQ by ID
router.patch('/faqs/:faqId', faqController.updateFaq);

// Remove an FAQ by ID
router.delete('/faqs/:faqId', faqController.removeFaq);

module.exports = router;

const express = require('express');
const router = express.Router();
const policiesController = require('../controllers/policyController');
const upload = require('../config/multerConfig')

// Define routes
router.get('/policies', upload.none(), policiesController.getPolicies);
router.post('/policies',upload.none(), policiesController.updatePolicies);

module.exports = router;

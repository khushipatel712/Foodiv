const express = require('express');
const router = express.Router();
const policiesController = require('../controllers/policyController');
const upload = require('../config/multerConfig');

// Save or update policy content
router.post('/:policyType',upload.none(), policiesController.savePolicy);

// Get policy content by type
router.get('/:policyType/:adminId', policiesController.getPolicy);

module.exports = router;

// routes/customerRoutes.js

const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Route to get the customer data
router.get('/customer', customerController.getCustomer);

// Route to update the customer data (using upsert)
router.put('/customer', customerController.updateCustomer);

// Route to delete the customer data
router.delete('/customer/field/:fieldName', customerController.deleteCustomerField);


module.exports = router;

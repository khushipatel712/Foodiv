// controllers/customerController.js

const Customer = require('../Models/Customer');


const getCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOne();
    if (!customer) {
      return res.status(404).json({ message: 'No customer data found' });
    }
    res.status(200).json(customer);
  } catch (error) {
    console.error('Error fetching customer data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const updateCustomer = async (req, res) => {
  try {
    const { total_restaurants, total_countries, total_orders } = req.body;

    const updatedCustomer = await Customer.findOneAndUpdate(
      {}, // Empty query to match the single entry
      { total_restaurants, total_countries, total_orders },
      { new: true, upsert: true } // Create if not exists
    );

    res.status(200).json(updatedCustomer);
  } catch (error) {
    console.error('Error updating customer data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete the customer entry
const deleteCustomerField = async (req, res) => {
    const { fieldName } = req.params; // Field name to delete
  
    if (!fieldName) {
      return res.status(400).json({ message: 'Field name is required' });
    }
  
    try {
      const result = await Customer.updateOne(
        {}, // Match the document (assuming only one document exists)
        { $unset: { [fieldName]: "" } } // Remove the specified field
      );
  
      if (result.modifiedCount === 0) {
        return res.status(404).json({ message: 'Field not found or no document updated' });
      }
  
      res.status(200).json({ message: `Field '${fieldName}' deleted successfully` });
    } catch (error) {
      console.error('Error deleting customer field:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

module.exports = {
  getCustomer,
  updateCustomer,
  deleteCustomerField
};

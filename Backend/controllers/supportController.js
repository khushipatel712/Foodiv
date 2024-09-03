const Support = require('../Models/Support');

// Create new support entry
exports.createSupport = async (req, res) => {
  const { adminId } = req.params;
  const { customerCareNumber, mobileNumber } = req.body;

  try {
    // Create a support object, but only include fields that are provided
    const supportData = {
      adminId,
    };

    if (customerCareNumber) supportData.customerCareNumber = customerCareNumber;
    if (mobileNumber) supportData.mobileNumber = mobileNumber;

    const newSupport = new Support(supportData);
    await newSupport.save();
    res.status(201).json(newSupport);
  } catch (error) {
    res.status(500).json({ message: 'Error creating support entry', error });
  }
};

// Get all support entries for an admin
exports.getSupportsByAdmin = async (req, res) => {
  const { adminId } = req.params;

  try {
    const supports = await Support.find({ adminId });
    res.status(200).json(supports);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching support entries', error });
  }
};

// Update a support entry
exports.updateSupport = async (req, res) => {
  const { adminId, id } = req.params;
  const { customerCareNumber, mobileNumber } = req.body;

  try {
    // Build an object with only the fields that are present in the request
    const updateData = {};

    if (customerCareNumber) updateData.customerCareNumber = customerCareNumber;
    if (mobileNumber) updateData.mobileNumber = mobileNumber;

    const updatedSupport = await Support.findOneAndUpdate(
      { _id: id, adminId },
      updateData,
      { new: true }
    );

    if (!updatedSupport) {
      return res.status(404).json({ message: 'Support entry not found' });
    }

    res.status(200).json(updatedSupport);
  } catch (error) {
    res.status(500).json({ message: 'Error updating support entry', error });
  }
};

// Delete a support entry
exports.deleteSupport = async (req, res) => {
  const { adminId, id } = req.params;

  try {
    const deletedSupport = await Support.findOneAndDelete({ _id: id, adminId });

    if (!deletedSupport) {
      return res.status(404).json({ message: 'Support entry not found' });
    }

    res.status(200).json({ message: 'Support entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting support entry', error });
  }
};

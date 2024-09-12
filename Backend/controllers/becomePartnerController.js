const BecomePartner = require('../Models/BecomePartner'); // Adjust the path as needed

// Get all BecomePartner data
exports.getBecomePartner = async (req, res) => {
    try {
        const data = await BecomePartner.findOne();
        if (!data) {
            return res.status(404).json({ message: 'No data found' });
        }
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Update or create BecomePartner data
exports.updateBecomePartner = async (req, res) => {
    try {
        console.log('Request body:', req.body);
        console.log('Request files:', req.files);

        const { title, description, setup } = req.body;
        const files = req.files || [];

        let existingData = await BecomePartner.findOne();

        if (!existingData) {
            existingData = new BecomePartner({ title: '', description: '', setup: [] });
        }

        // Update title and description
        existingData.title = title;
        existingData.description = description;

        // Process new setup items
        if (setup && Array.isArray(setup)) {
            existingData.setup = []; // Clear the existing setup array

            for (let i = 0; i < setup.length; i++) {
                const newItem = setup[i];
                if (!newItem.title || !newItem.alt_tag || !newItem.description) {
                    return res.status(400).json({ message: 'Title, alt_tag, and description are required for each setup item.' });
                }

                const newSetupItem = {
                    title: newItem.title,
                    alt_tag: newItem.alt_tag,
                    description: newItem.description,
                };

                // Find the corresponding file
                const file = files.find(f => f.fieldname === `setup[${i}][logo]`);
                if (file) {
                    newSetupItem.logo = file.filename;
                } else if (newItem.logo) {
                    newSetupItem.logo = newItem.logo;
                } else {
                    return res.status(400).json({ message: 'Logo is required for each setup item.' });
                }

                existingData.setup.push(newSetupItem);
            }
        }

        await existingData.save();

        res.status(200).json({ message: 'BecomePartner updated successfully!', data: existingData });
    } catch (error) {
        console.error('Error updating BecomePartner:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Remove a setup item by ID
exports.removeSetupItem = async (req, res) => {
    try {
        const { itemId } = req.params;

        const data = await BecomePartner.findOneAndUpdate(
            {}, // Use a filter to identify the document, or leave empty to target the first document found
            {
                $pull: { setup: { _id: itemId } } // Remove the setup item by its ID
            },
            { new: true }
        );

        if (!data) {
            return res.status(404).json({ message: 'Setup item not found' });
        }

        res.status(200).json({ message: 'Setup item removed successfully!', data });
    } catch (error) {
        console.error('Error removing setup item:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

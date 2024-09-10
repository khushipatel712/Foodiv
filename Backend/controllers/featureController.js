const Feature = require('../Models/Feature'); // Adjust the path as needed

// Get all feature data
exports.getFeatures = async (req, res) => {
    try {
        const data = await Feature.findOne();
        if (!data) {
            return res.status(404).json({ message: 'No data found' });
        }
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Update or create feature data
exports.updateFeatures = async (req, res) => {
    try {
        const { title, description, features } = req.body;
        const files = req.files || [];

        let existingData = await Feature.findOne();

        if (!existingData) {
            existingData = new Feature({ title: '', description: '', features: [] });
        }

        existingData.title = title;
        existingData.description = description;

        if (features && Array.isArray(features)) {
            existingData.features = []; 

            for (let i = 0; i < features.length; i++) {
                const newItem = features[i];
                if (!newItem.title || !newItem.alt_tag || !newItem.description) {
                    return res.status(400).json({ message: 'Title, alt_tag, and description are required for each feature item.' });
                }

                const newFeatureItem = {
                    title: newItem.title,
                    alt_tag: newItem.alt_tag,
                    description: newItem.description,
                };

                const file = files.find(f => f.fieldname === `features[${i}][logo]`);
                if (file) {
                    newFeatureItem.logo = file.filename;
                } else if (newItem.logo) {
                    newFeatureItem.logo = newItem.logo;
                } else {
                    return res.status(400).json({ message: 'Logo is required for each feature item.' });
                }

                existingData.features.push(newFeatureItem);
            }
        }

        await existingData.save();

        res.status(200).json({ message: 'Features updated successfully!', data: existingData });
    } catch (error) {
        console.error('Error updating features:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Remove a feature item by ID
exports.removeFeatureItem = async (req, res) => {
    try {
        const { itemId } = req.params;

        const data = await Feature.findOneAndUpdate(
            {}, 
            {
                $pull: { features: { _id: itemId } }
            },
            { new: true }
        );

        if (!data) {
            return res.status(404).json({ message: 'Feature item not found' });
        }

        res.status(200).json({ message: 'Feature item removed successfully!', data });
    } catch (error) {
        console.error('Error removing feature item:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

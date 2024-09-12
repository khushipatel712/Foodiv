const PartnerNetwork = require('../Models/PartnerNetwork');

// Get PartnerNetwork details
const getPartnerNetwork = async (req, res) => {
    try {
        const partnerNetworkItem = await PartnerNetwork.findOne({});

        if (!partnerNetworkItem) {
            return res.status(404).json({ message: 'PartnerNetwork item not found' });
        }

        res.json(partnerNetworkItem);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error fetching PartnerNetwork details' });
    }
};

// Update PartnerNetwork details (including image upload)
const updatePartnerNetwork = async (req, res) => {
    try {
        const { title, keypoints } = req.body;
        const image = req.files.image ? req.files.image[0].filename : null;

        const updateFields = {
            title,
            keypoints: keypoints ? JSON.parse(keypoints) : [],
        };

        if (image) updateFields.image = image;

        const partnerNetworkItem = await PartnerNetwork.findOneAndUpdate(
            {}, // Empty filter to match any document (since we are creating/updating only one document)
            updateFields,
            { new: true, upsert: true } // Upsert option
        );

        res.json({ message: 'PartnerNetwork item updated successfully', partnerNetworkItem });
    } catch (error) {
        res.status(500).json({ message: 'Error updating PartnerNetwork item', error });
    }
};

// Remove a specific keypoint by value
const removeKeypoint = async (req, res) => {
    try {
        const { keypoint } = req.query; // Get keypoint from query parameters

        if (!keypoint) {
            return res.status(400).json({ message: 'Keypoint value is required' });
        }

        const partnerNetworkItem = await PartnerNetwork.findOne();
        if (!partnerNetworkItem) {
            return res.status(404).json({ message: 'PartnerNetwork item not found' });
        }

        // Check if the keypoint exists in the array
        const keypointIndex = partnerNetworkItem.keypoints.indexOf(keypoint);
        if (keypointIndex === -1) {
            return res.status(404).json({ message: 'Keypoint not found' });
        }

        // Remove the keypoint
        partnerNetworkItem.keypoints.splice(keypointIndex, 1);
        await partnerNetworkItem.save();

        res.json({ message: 'Keypoint removed successfully', partnerNetworkItem });
    } catch (error) {
        res.status(500).json({ message: 'Error removing keypoint' });
    }
};

module.exports = {
    getPartnerNetwork,
    updatePartnerNetwork,
    removeKeypoint
};

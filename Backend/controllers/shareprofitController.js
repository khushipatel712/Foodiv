const ShareProfit = require('../Models/ShareProfit');
const upload = require('../config/multerConfig');

// Get ShareProfit details
const getShareProfit = async (req, res) => {
    try {
        const shareProfitItem = await ShareProfit.findOne({});
        // console.log("item:", shareProfitItem); // Log the item

        if (!shareProfitItem) {
            return res.status(404).json({ message: 'ShareProfit item not found' });
        }

        res.json(shareProfitItem);
    } catch (error) {
        console.error('Error:', error); // Improved error logging
        res.status(500).json({ message: 'Error fetching ShareProfit details' });
    }
};

// Update ShareProfit details (including image uploads)
const updateShareProfit = async (req, res) => {
    try {
        const { title, description, keypoints } = req.body;
        const logo = req.files.logo ? req.files.logo[0].filename : null;
        const image = req.files.image ? req.files.image[0].filename : null;

        const updateFields = {
            title,
            description,
            keypoints: keypoints ? JSON.parse(keypoints) : [], // Parse keypoints from JSON string
        };

        if (logo) updateFields.logo = logo;
        if (image) updateFields.image = image;

        const shareProfitItem = await ShareProfit.findOneAndUpdate(
            {}, // Empty filter to match any document (since we are creating/updating only one document)
            updateFields,
            { new: true, upsert: true } // Upsert option
        );

        res.json({ message: 'ShareProfit item updated successfully', shareProfitItem });
    } catch (error) {
        res.status(500).json({ message: 'Error updating ShareProfit item', error });
    }
};

// Remove a specific keypoint by value
const removeKeypoint = async (req, res) => {
    try {
        const { keypoint } = req.query; // Get keypoint from query parameters

        if (!keypoint) {
            return res.status(400).json({ message: 'Keypoint value is required' });
        }

        const shareProfitItem = await ShareProfit.findOne();
        if (!shareProfitItem) {
            return res.status(404).json({ message: 'ShareProfit item not found' });
        }

        // Check if the keypoint exists in the array
        const keypointIndex = shareProfitItem.keypoints.indexOf(keypoint);
        if (keypointIndex === -1) {
            return res.status(404).json({ message: 'Keypoint not found' });
        }

        // Remove the keypoint
        shareProfitItem.keypoints.splice(keypointIndex, 1);
        await shareProfitItem.save();

        res.json({ message: 'Keypoint removed successfully', shareProfitItem });
    } catch (error) {
        res.status(500).json({ message: 'Error removing keypoint' });
    }
};

module.exports = {
    getShareProfit,
    updateShareProfit,
    removeKeypoint
};

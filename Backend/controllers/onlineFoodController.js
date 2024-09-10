const OnlineFood = require('../Models/OnlineFood');
const upload = require('../config/multerConfig');

// Get OnlineFood details
const getOnlineFood = async (req, res) => {
    try {
        const onlineFoodItem = await OnlineFood.findOne({});
        if (!onlineFoodItem) {
            return res.status(404).json({ message: 'OnlineFood item not found' });
        }
        res.json(onlineFoodItem);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error fetching OnlineFood details' });
    }
};

// Update OnlineFood details (including image uploads)
const updateOnlineFood = async (req, res) => {
    try {
        const { title, description, keypoints } = req.body;
        const logo = req.files.logo ? req.files.logo[0].filename : null;
        const image = req.files.image ? req.files.image[0].filename : null;

        const updateFields = {
            title,
            description,
            keypoints: keypoints ? JSON.parse(keypoints) : [],
        };

        if (logo) updateFields.logo = logo;
        if (image) updateFields.image = image;

        const onlineFoodItem = await OnlineFood.findOneAndUpdate(
            {},
            updateFields,
            { new: true, upsert: true }
        );

        res.json({ message: 'OnlineFood item updated successfully', onlineFoodItem });
    } catch (error) {
        res.status(500).json({ message: 'Error updating OnlineFood item', error });
    }
};

// Remove a specific keypoint by value
const removeKeypoint = async (req, res) => {
    try {
        const { keypoint } = req.query;

        if (!keypoint) {
            return res.status(400).json({ message: 'Keypoint value is required' });
        }

        const onlineFoodItem = await OnlineFood.findOne();
        if (!onlineFoodItem) {
            return res.status(404).json({ message: 'OnlineFood item not found' });
        }

        const keypointIndex = onlineFoodItem.keypoints.indexOf(keypoint);
        if (keypointIndex === -1) {
            return res.status(404).json({ message: 'Keypoint not found' });
        }

        onlineFoodItem.keypoints.splice(keypointIndex, 1);
        await onlineFoodItem.save();

        res.json({ message: 'Keypoint removed successfully', onlineFoodItem });
    } catch (error) {
        res.status(500).json({ message: 'Error removing keypoint' });
    }
};

module.exports = {
    getOnlineFood,
    updateOnlineFood,
    removeKeypoint
};

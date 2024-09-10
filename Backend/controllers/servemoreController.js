const ServeMore = require('../Models/ServeMore');
const upload = require('../config/multerConfig');

// Get ServeMore details
const getServeMore = async (req, res) => {
    try {
        const serveMoreItem = await ServeMore.findOne({});
        // console.log("item:", serveMoreItem); // Log the item

        if (!serveMoreItem) {
            return res.status(404).json({ message: 'ServeMore item not found' });
        }

        res.json(serveMoreItem);
    } catch (error) {
        console.error('Error:', error); // Improved error logging
        res.status(500).json({ message: 'Error fetching ServeMore details' });
    }
};

// Update ServeMore details (including image uploads)
const updateServeMore = async (req, res) => {
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

        const serveMoreItem = await ServeMore.findOneAndUpdate(
            {}, // Empty filter to match any document (since we are creating/updating only one document)
            updateFields,
            { new: true, upsert: true } // Upsert option
        );

        res.json({ message: 'ServeMore item updated successfully', serveMoreItem });
    } catch (error) {
        res.status(500).json({ message: 'Error updating ServeMore item', error });
    }
};


// Remove a specific keypoint by value
const removeKeypoint = async (req, res) => {
    try {
        const { keypoint } = req.query; // Get keypoint from query parameters

        if (!keypoint) {
            return res.status(400).json({ message: 'Keypoint value is required' });
        }

        const serveMoreItem = await ServeMore.findOne();
        if (!serveMoreItem) {
            return res.status(404).json({ message: 'ServeMore item not found' });
        }

        // Check if the keypoint exists in the array
        const keypointIndex = serveMoreItem.keypoints.indexOf(keypoint);
        if (keypointIndex === -1) {
            return res.status(404).json({ message: 'Keypoint not found' });
        }

        // Remove the keypoint
        serveMoreItem.keypoints.splice(keypointIndex, 1);
        await serveMoreItem.save();

        res.json({ message: 'Keypoint removed successfully', serveMoreItem });
    } catch (error) {
        res.status(500).json({ message: 'Error removing keypoint' });
    }
};

module.exports = {
    getServeMore,
    updateServeMore,
    removeKeypoint
};

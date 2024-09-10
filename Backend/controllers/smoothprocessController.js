const SmoothProcess = require('../Models/SmoothProcess');
const upload = require('../config/multerConfig');

// Get SmoothProcess details
const getSmoothProcess = async (req, res) => {
    try {
        const smoothProcessItem = await SmoothProcess.findOne({});
        // console.log("item:", smoothProcessItem); // Log the item

        if (!smoothProcessItem) {
            return res.status(404).json({ message: 'SmoothProcess item not found' });
        }

        res.json(smoothProcessItem);
    } catch (error) {
        console.error('Error:', error); // Improved error logging
        res.status(500).json({ message: 'Error fetching SmoothProcess details' });
    }
};

// Update SmoothProcess details (including image uploads)
const updateSmoothProcess = async (req, res) => {
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

        const smoothProcessItem = await SmoothProcess.findOneAndUpdate(
            {}, // Empty filter to match any document (since we are creating/updating only one document)
            updateFields,
            { new: true, upsert: true } // Upsert option
        );

        res.json({ message: 'SmoothProcess item updated successfully', smoothProcessItem });
    } catch (error) {
        res.status(500).json({ message: 'Error updating SmoothProcess item', error });
    }
};

// Remove a specific keypoint by value
const removeKeypoint = async (req, res) => {
    try {
        const { keypoint } = req.query; // Get keypoint from query parameters

        if (!keypoint) {
            return res.status(400).json({ message: 'Keypoint value is required' });
        }

        const smoothProcessItem = await SmoothProcess.findOne();
        if (!smoothProcessItem) {
            return res.status(404).json({ message: 'SmoothProcess item not found' });
        }

        // Check if the keypoint exists in the array
        const keypointIndex = smoothProcessItem.keypoints.indexOf(keypoint);
        if (keypointIndex === -1) {
            return res.status(404).json({ message: 'Keypoint not found' });
        }

        // Remove the keypoint
        smoothProcessItem.keypoints.splice(keypointIndex, 1);
        await smoothProcessItem.save();

        res.json({ message: 'Keypoint removed successfully', smoothProcessItem });
    } catch (error) {
        res.status(500).json({ message: 'Error removing keypoint' });
    }
};

module.exports = {
    getSmoothProcess,
    updateSmoothProcess,
    removeKeypoint
};

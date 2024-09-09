const Manage = require('../Models/Manage');


exports.getManageData = async (req, res) => {
    try {
        const data = await Manage.findOne();
        if (!data) {
            return res.status(404).json({ message: 'No data found' });
        }
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};


exports.updateManageData = async (req, res) => {
    try {
        const { title, description, alt_tag } = req.body;
        const video = req.file ? req.file.path : undefined;

        // Update or create the document if not found
        const updatedData = await Manage.findOneAndUpdate(
            {}, // This will match the first document found
            { title, description, alt_tag, video }, 
            { new: true, runValidators: true, upsert: true } // `upsert` creates the document if it doesn't exist
        );

        res.json(updatedData);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const Footer = require('../Models/Footer');


exports.getFooter = async (req, res) => {
    try {
        const footer = await Footer.findOne();
        if (!footer) {
            return res.status(404).json({ message: 'Footer not found' });
        }
        res.json(footer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.updateFooter = async (req, res) => {
    try {
        const updatedData = req.body;

        if (req.file) {
            updatedData.logo = req.file.filename;
        }

        const footer = await Footer.findOneAndUpdate({}, updatedData, { new: true, upsert: true });
        res.json(footer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


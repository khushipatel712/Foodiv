const OnlineWeb = require('../Models/OnlineWeb');

// Get the single document
exports.getOnlineWeb = async (req, res) => {
    try {
        const onlineWeb = await OnlineWeb.findOne();
        if (!onlineWeb) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.json(onlineWeb);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update the single document
exports.updateOnlineWeb = async (req, res) => {
    try {
        const { title, description, points } = req.body;
        const updatedOnlineWeb = await OnlineWeb.findOneAndUpdate(
            {},
            { title, description, points },
            { new: true, upsert: true } // upsert creates the document if it does not exist
        );
        res.json(updatedOnlineWeb);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

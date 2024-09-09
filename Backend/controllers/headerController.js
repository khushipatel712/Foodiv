const Header = require('../Models/Header');
const path = require('path');
const fs = require('fs');

// Create a new header
exports.createHeader = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const { title } = req.body;
        const logo = req.file.filename;

        const newHeader = new Header({ title, logo });
        await newHeader.save();

        res.status(201).json(newHeader);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all headers
exports.getHeader = async (req, res) => {
    try {
        const header = await Header.findOne(); // Assuming there's only one entry
        if (!header) {
            return res.status(404).json({ message: 'Header not found' });
        }
        res.json(header);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single header by ID
exports.getHeaderById = async (req, res) => {
    try {
        const header = await Header.findById(req.params.id);
        if (!header) return res.status(404).json({ message: 'Header not found' });
        res.status(200).json(header);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a header
exports.updateHeader = async (req, res) => {
    try {
        const { title } = req.body;
        let updateData = { title };

        if (req.file) {
            updateData.logo = req.file.filename;
        }

        const header = await Header.findOneAndUpdate({}, updateData, { new: true, upsert: true });
        res.json(header);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a header
exports.deleteHeader = async (req, res) => {
    try {
        const header = await Header.findByIdAndDelete(req.params.id);
        if (!header) return res.status(404).json({ message: 'Header not found' });

        // Optionally delete the file from the filesystem
        const logoPath = path.join(__dirname, '../uploads', header.logo);
        if (fs.existsSync(logoPath)) {
            fs.unlinkSync(logoPath);
        }

        res.status(200).json({ message: 'Header deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

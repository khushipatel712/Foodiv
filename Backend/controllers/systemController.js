// controllers/systemController.js
const System = require('../Models/System');
const path = require('path');

// Create a new system with image upload
exports.createSystem = async (req, res) => {
  try {
    const { title, slug } = req.body;
    const image = req.file ? req.file.path : ""; // Store the image path
    const newSystem = new System({ title, slug, image });
    const savedSystem = await newSystem.save();
    res.status(201).json(savedSystem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all systems
exports.getAllSystems = async (req, res) => {
  try {
    const systems = await System.find();
    res.json(systems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getSystemBySlug = async (req, res) => {
    try {
      const system = await System.findOne({ slug: req.params.slug });
      if (system) {
        res.json(system);
      } else {
        res.status(404).json({ message: 'System not found' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  


exports.updateSystem = async (req, res) => {
    try {
      const { title, slug } = req.body;
      const image = req.file ? req.file.path : undefined; // Store the image path if a new file is uploaded
      const updateData = { title, slug };
      if (image) updateData.image = image;
  
      // Find system by slug and update it
      const updatedSystem = await System.findOneAndUpdate(
        { slug: req.params.slug },
        updateData,
        { new: true }
      );
      
      if (updatedSystem) {
        res.json(updatedSystem);
      } else {
        res.status(404).json({ message: 'System not found' });
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  

  exports.deleteSystem = async (req, res) => {
    try {
      // Find the system by slug
      const system = await System.findOne({ slug: req.params.slug });
      if (!system) {
        return res.status(404).json({ message: 'System not found' });
      }
  
      const imagePath = system.image;
  
      // Delete the system record
      await System.findOneAndDelete({ slug: req.params.slug });
  
      // Remove the image file if it exists
      if (imagePath) {
        fs.unlink(path.resolve(imagePath), (err) => {
          if (err) console.error('Failed to delete image:', err);
        });
      }
  
      res.status(204).json({ message: 'System deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
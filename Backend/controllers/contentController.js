const Content = require('../Models/Content');
const System = require('../Models/System');


// Get all content entries
exports.getAllContent = async (req, res) => {
  try {
    const contentData = await Content.find();
    res.status(200).json(contentData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single content entry by ID
exports.getContentById = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    res.status(200).json(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getContentBySystemSlug = async (req, res) => {
    try {
      const { slug } = req.params; // Extract system slug from params
  
      // Find the system by slug
      const system = await System.findOne({ slug });
  
      if (!system) {
        return res.status(404).json({ message: 'System not found' });
      }
  
      // Retrieve the content associated with this system
      const content = await Content.findById(system.content);
  
      // If content is not found, return an empty content object or a specific message
      if (!content) {
        return res.status(200).json({ message: 'No content found for this system', content: null });
      }
      res.status(200).json(content);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

//   const Content = require('../Models/Content');
//   const System = require('../Models/System');
  
  // Create Content with image upload handling
  exports.createContent = async (req, res) => {
    try {
      const {
        slug, title, content1, title2, content2, title3, title4, panels, faqs
      } = req.body;
  
      // Handle image uploads
      const image1 = req.files['image1'] ? req.files['image1'][0].path : null;
  
      // Find the system by its slug
      const system = await System.findOne({ slug });
  
      if (!system) {
        return res.status(404).json({ error: "System not found" });
      }
  
      // Create new content
      const newContent = new Content({
        title,
        image1,
        content1,
        title2,
        content2,
        title3,
        title4,
        panel: panels, // panels is an array
        faqs // faqs object with title, description, and questions array
      });
  
      // Save the new content
      const savedContent = await newContent.save();
  
      // Associate the saved content with the system
      system.content = savedContent._id;
      await system.save();
  
      // Respond with the saved content
      res.status(201).json(savedContent);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  

  exports.updateContent = async (req, res) => {
    try {
      const contentId = req.params.id;
      const updateData = req.body;
  
      // Handle image uploads
      const image1 = req.files['image1'] ? req.files['image1'][0].path : undefined;
  
      // Update content
      const updatedContent = await Content.findByIdAndUpdate(
        contentId,
        {
          ...updateData,
          image1: image1 !== undefined ? image1 : undefined
        },
        { new: true }
      );
  
      if (!updatedContent) {
        return res.status(404).json({ message: 'Content not found' });
      }
  
      // Respond with the updated content
      res.status(200).json(updatedContent);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

// Update Content by System Slug with image upload handling
exports.updateContentBySystemSlug = async (req, res) => {
    try {
      const { slug } = req.params;
      const updateData = req.body;
  
      // Handle image uploads
      const image1 = req.files['image1'] ? req.files['image1'][0].path : undefined;
  
      // Find the system by slug
      const system = await System.findOne({ slug });
  
      if (!system) {
        return res.status(404).json({ message: 'System not found' });
      }
  
      if (!system.content) {
        return res.status(404).json({ message: 'Content not found for this system' });
      }
  
      // Update the content
      const updatedContent = await Content.findByIdAndUpdate(
        system.content,
        {
          ...updateData,
          image1: image1 !== undefined ? image1 : undefined
        },
        { new: true }
      );
  
      if (!updatedContent) {
        return res.status(404).json({ message: 'Content not found' });
      }
  
      // Respond with the updated content
      res.status(200).json(updatedContent);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  


exports.deleteContent = async (req, res) => {
  try {
    const deletedContent = await Content.findByIdAndDelete(req.params.id);
    if (!deletedContent) {
      return res.status(404).json({ message: 'Content not found' });
    }
    res.status(200).json({ message: 'Content deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.deleteContentBySystemSlug = async (req, res) => {
    try {
      const { slug } = req.params;
  
      // Find the system by slug
      const system = await System.findOne({ slug });
  
      if (!system) {
        return res.status(404).json({ message: 'System not found' });
      }
  
      if (!system.content) {
        return res.status(404).json({ message: 'Content not found for this system' });
      }
  
      // Delete the content
      await Content.findByIdAndDelete(system.content);
  
      // Remove the content reference from the system
      await System.findByIdAndUpdate(
        system._id,
        { $unset: { content: "" } }
      );
  
      res.status(200).json({ message: 'Content deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
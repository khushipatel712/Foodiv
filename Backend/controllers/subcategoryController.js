const Subcategory = require('../Models/SubCategory');
const Category = require('../Models/Category'); // Import Category model
const fs = require('fs');
const path = require('path');

// Create a new subcategory
exports.createSubcategory = async (req, res) => {
  try {
    const { name, description, category, adminId } = req.body;
    const image = req.file ? req.file.path : ''; // Handle optional image upload

    // Check if the category exists
    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(400).json({ message: 'Category not found' });
    }

    // Create a new subcategory
    const newSubcategory = new Subcategory({
      name,
      description,
      image,
      category,
      admin: adminId // Set admin reference
    });

    await newSubcategory.save();
    res.status(201).json(newSubcategory);
  } catch (error) {
    console.error('Error creating subcategory:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a subcategory by ID
exports.updateSubcategory = async (req, res) => {
  try {
    const { name, description, category, adminId } = req.body;
    const image = req.file ? req.file.path : undefined; // Handle optional image update

    // Check if the category exists if provided
    if (category) {
      const existingCategory = await Category.findById(category);
      if (!existingCategory) {
        return res.status(400).json({ message: 'Category not found' });
      }
    }

    const updateData = { name, description, category };
    if (image) {
      updateData.image = image;
    }
    if (adminId) {
      updateData.admin = adminId; // Update admin reference if provided
    }

    const updatedSubcategory = await Subcategory.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedSubcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }
    res.json(updatedSubcategory);
  } catch (error) {
    console.error('Error updating subcategory:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a subcategory by ID
exports.deleteSubcategory = async (req, res) => {
  try {
    const { id } = req.body; // Extract id from form data
    
    const deletedSubcategory = await Subcategory.findByIdAndDelete(id);
    if (!deletedSubcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }
    
    // Optionally: Delete associated image from server if needed
    if (deletedSubcategory.image) {
      fs.unlinkSync(deletedSubcategory.image);
    }

    res.json({ message: 'Subcategory deleted successfully' });
  } catch (error) {
    console.error('Error deleting subcategory:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all subcategories
exports.getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find().populate('category', 'categoryName').populate('admin', 'restaurantName'); // Populate category and admin fields
    res.json(subcategories);
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single subcategory by ID
exports.getSubcategoryById = async (req, res) => {
  try {
    const subcategory = await Subcategory.findById(req.params.id).populate('category', 'categoryName').populate('admin', 'restaurantName');
    if (!subcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }
    res.json(subcategory);
  } catch (error) {
    console.error('Error fetching subcategory:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getSubcategory = async (req, res) => {
  const { categoryId } = req.params;

  // Log the incoming request for debugging
  // console.log("Received Category ID:", categoryId);

  try {
    // Validate categoryId
    if (!categoryId) {
      return res.status(400).json({ message: "Category ID is required" });
    }

    // Fetch subcategories by category ID
    const subcategories = await Subcategory.find({ category: categoryId });

    // // Log the fetched subcategories for debugging
    // console.log("Fetched Subcategories:", subcategories);

    // Check if subcategories are found
    if (subcategories.length === 0) {
      return res.status(404).json({ message: "Subcategories not found for the given category ID" });
    }

    // Return the list of subcategories
    res.json(subcategories);
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching subcategories:", error);

    // Return a server error response
    res.status(500).json({ message: "Error fetching subcategories", error: error.message });
  }
};
const Category = require('../Models/Category');
const Admin = require('../Models/adminModel');

// Create a new category
exports.createCategory = async (req, res) => {
    try {
        const { categoryName, description, adminId } = req.body;
        console.log(categoryName,description,adminId)
        const admin = await Admin.findById(adminId);

        if (!admin) return res.status(404).json({ message: 'Admin not found' });

        const category = new Category({
            categoryName,
            description,
            image: req.file ? `/images/${req.file.filename}` : null,
            admin: admin._id,
        });

        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find().populate('admin');
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get a specific category by ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id).populate('admin');
        if (!category) return res.status(404).json({ message: 'Category not found' });

        res.json(category);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update a category
exports.updateCategory = async (req, res) => {
    try {
        const { categoryName, description } = req.body;
        const category = await Category.findById(req.params.id);

        if (!category) return res.status(404).json({ message: 'Category not found' });

        category.categoryName = categoryName || category.categoryName;
        category.description = description || category.description;
        if (req.file) category.image = `/images/${req.file.filename}`;

        await category.save();
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) return res.status(404).json({ message: 'Category not found' });

        await category.deleteOne();
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.updateStatus = async (req, res) => {
    try {
      // Extract `id` from URL parameters
      const { id } = req.params;
  
      console.log('Request Parameters:', req.params);
  
      // Find the category by ID
      const category = await Category.findById(id);
  
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      // Toggle the `show` field
      category.show = !category.show;
      await category.save();
  
      // Respond with the updated `show` status
      res.status(200).json({ show: category.show });
    } catch (error) {
      console.error('Error updating status:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
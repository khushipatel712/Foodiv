const MenuItem = require('../Models/MenuItem');

// Create a new menu item
exports.createMenuItem = async (req, res) => {
  try {
    const { name, category, subCategory, price, comparePrice, veg, description, variants, adminId } = req.body;

    // Handle image upload if provided
    const image = req.file ? req.file.path : '';

    const newMenuItem = new MenuItem({
      name,
      category,
     subCategory: subCategory ? subCategory : null,
      price,
      comparePrice,
      veg,
      description,
      variants,
      image,
      adminId
    });

    const savedMenuItem = await newMenuItem.save();
    res.status(201).json(savedMenuItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all menu items
exports.getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find().populate('category').populate('subCategory');
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a menu item by ID
exports.getMenuItemById = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id).populate('category').populate('subCategory');
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.status(200).json(menuItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a menu item by ID
exports.updateMenuItem = async (req, res) => {
  try {
    const { name, category, subCategory, price, comparePrice, veg, description, variants, adminId } = req.body;

    const updatedData = {
      name,
      category,
      subCategory,
      price,
      comparePrice,
      veg,
      description,
      variants,
      adminId
    };

    // Handle image upload if provided
    if (req.file) {
      updatedData.image = req.file.path;
    }

    const updatedMenuItem = await MenuItem.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!updatedMenuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.status(200).json(updatedMenuItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a menu item by ID
exports.deleteMenuItem = async (req, res) => {
  try {
    const deletedMenuItem = await MenuItem.findByIdAndDelete(req.params.id);

    if (!deletedMenuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.status(200).json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.updateStatus1 = async (req, res) => {
  try {
    // Extract `id` from URL parameters
    const { id } = req.params;

    console.log('Request Parameters:', req.params);

    // Find the category by ID
    const menuitem = await MenuItem.findById(id);

    if (!menuitem) {
      return res.status(404).json({ message: 'Menuitem not found' });
    }

    // Toggle the `show` field
    menuitem.show = !menuitem.show;
    await menuitem.save();

    // Respond with the updated `show` status
    res.status(200).json({ show: menuitem.show });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getMenuItemByAdminId = async (req, res) => {
  try {

    const menuItems = await MenuItem.find({ adminId: req.params.adminId })
      .populate('category')
      .populate('subCategory');
    if (!menuItems.length) {
      return res.status(404).json({ message: 'No menu items found for this admin' });
    }
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
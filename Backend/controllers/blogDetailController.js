const BlogDetail = require('../Models/BlogDetail');

// Get all blog details
exports.getBlogDetails = async (req, res) => {
    try {
        const blogDetails = await BlogDetail.find({});
        res.json(blogDetails);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching blog details' });
    }
};

// Get a single blog detail by ID
exports.getBlogDetailById = async (req, res) => {
    try {
        const blogDetail = await BlogDetail.findById(req.params.id);
        if (!blogDetail) {
            return res.status(404).json({ message: 'Blog detail not found' });
        }
        res.json(blogDetail);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching blog detail' });
    }
};

// Add a new blog detail
exports.addBlogDetail = async (req, res) => {
    const { category } = req.body;
    try {
        const newBlogDetail = new BlogDetail({ category });
        await newBlogDetail.save();
        res.status(201).json(newBlogDetail);
    } catch (error) {
        res.status(500).json({ message: 'Error adding blog detail' });
    }
};

// Update a blog detail by ID
exports.updateBlogDetailById = async (req, res) => {
    const { category } = req.body;
    try {
        const updatedBlogDetail = await BlogDetail.findByIdAndUpdate(
            req.params.id,
            { category },
            { new: true, runValidators: true }
        );
        if (!updatedBlogDetail) {
            return res.status(404).json({ message: 'Blog detail not found' });
        }
        res.json(updatedBlogDetail);
    } catch (error) {
        res.status(500).json({ message: 'Error updating blog detail' });
    }
};

// Delete a blog detail by ID
exports.deleteBlogDetailById = async (req, res) => {
    try {
        const deletedBlogDetail = await BlogDetail.findByIdAndDelete(req.params.id);
        if (!deletedBlogDetail) {
            return res.status(404).json({ message: 'Blog detail not found' });
        }
        res.json({ message: 'Blog detail deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting blog detail' });
    }
};

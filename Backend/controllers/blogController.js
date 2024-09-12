const Blog = require('../Models/Blog');
const fs=require('fs');
const path=require('path')

// Get all blogs
exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({}).populate('blog');
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching blogs' });
    }
};

// Get a single blog by ID
exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.slug).populate('blog');
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching blog' });
    }
};

// Add a new blog
exports.addBlog = async (req, res) => {
    const { title, date, details, postedBy, status, blog, restaurantName, slug, headline } = req.body;

    // Handle image
    let photo = '';
    if (req.file) {
        photo = req.file.path;
    }

    try {
        // Check if a blog with the same slug already exists
        const existingBlog = await Blog.findOne({ slug });
        if (existingBlog) {
            return res.status(400).json({ message: 'Slug already in use' });
        }

        // Create and save the new blog
        const newBlog = new Blog({
            title,
            date,
            details,
            photo,
            alt: req.body.alt || '',
            postedBy,
            status,
            slug,
            blog,
            restaurantName,
            headline
        });
        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(500).json({ message: 'Error adding blog', error });
    }
};

exports.deleteBlog = async (req, res) => { 
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Delete the image file from the file system
        if (blog.photo) {
            fs.unlink(path.resolve(blog.photo), (err) => {
                if (err) {
                    console.error('Error deleting image:', err);
                    return res.status(500).json({ message: 'Error deleting image', error: err });
                }
            });
        }

        // Delete the blog from the database
        await Blog.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        console.error('Error deleting blog:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error deleting blog', error });
    }
};
// Get a single blog by blog name
exports.getBlogByBlog = async (req, res) => {
    try {
        const blog = await Blog.findOne({ blog: req.params.blogName }).populate('blog');
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching blog by name' });
    }
};

exports.getBlogBySlug = async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug }).populate('blog');
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching blog by slug' });
    }
};



exports.updateBlogBySlug = async (req, res) => {
    const { slug } = req.params;
    const { title, date, details, postedBy, status, blog, restaurantName, alt , headline} = req.body;
    const newSlug = req.body.slug; 

    console.log(req.body);
    console.log('Uploaded file:', req.file);

    let photo = req.body.photo || '';
    if (req.file) {
        photo = req.file.path; 
    }

    try {
      
        if (newSlug && newSlug !== slug) {
            const existingBlog = await Blog.findOne({ slug: newSlug });
            if (existingBlog) {
                return res.status(400).json({ message: 'Slug already in use' });
            }
        }

        const updatedBlog = await Blog.findOneAndUpdate(
            { slug }, // Match the blog by old slug
            {
                title,
                date,
                details,
                photo, // Update photo if a new one is provided
                alt: alt || '', // Default to empty string if alt is not provided
                postedBy,
                status,
                blog,
                restaurantName,
                headline,
                slug: newSlug || slug // Update slug if new one is provided
            },
            { new: true } // Return the updated document
        );

        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.json(updatedBlog);
    } catch (error) {
        console.error('Error updating blog:', error);
        res.status(500).json({ message: 'Error updating blog' });
    }
};


// Delete a blog by slug
exports.deleteBlogBySlug = async (req, res) => {
    const { slug } = req.params;

    try {
        const blog = await Blog.findOne({ blog: slug });
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Delete the image file from the file system
        if (blog.photo) {
            fs.unlink(path.resolve(blog.photo), (err) => {
                if (err) console.error('Error deleting image:', err);
            });
        }

        // Delete the blog from the database
        await Blog.findOneAndDelete({ blog: slug });
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting blog' });
    }
};

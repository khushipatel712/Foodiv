const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const upload = require('../config/multerConfig');


router.post('/blogs', upload.single('photo'), blogController.addBlog);

router.get('/blogs', blogController.getBlogs);


router.get('/blogs/:slug', blogController.getBlogById);

router.delete('/blogs/:id', blogController.deleteBlog);

router.get('/blogs/:blogName', blogController.getBlogByBlog);

router.get('/blogs/slug/:slug', blogController.getBlogBySlug);

router.put('/blogs/slug/:slug',upload.single('photo'), blogController.updateBlogBySlug);

router.delete('/blogs/slug/:slug', blogController.deleteBlogBySlug);

module.exports = router;

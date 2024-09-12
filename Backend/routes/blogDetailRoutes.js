// routes/blogDetailRoutes.js
const express = require('express');
const router = express.Router();
const blogDetailController = require('../controllers/blogDetailController');

router.get('/blogdetails', blogDetailController.getBlogDetails);
router.get('/blogdetails/:id', blogDetailController.getBlogDetailById);
router.post('/blogdetails', blogDetailController.addBlogDetail);
router.put('/blogdetails/:id', blogDetailController.updateBlogDetailById);
router.delete('/blogdetails/:id', blogDetailController.deleteBlogDetailById);

module.exports = router;

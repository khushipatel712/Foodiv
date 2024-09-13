const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');
// const upload = require('../config/multerConfig')
const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images') // Make sure this directory exists
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  });
  
  const fileFilter = (req, file, cb) => {
    if (file.fieldname === 'image1' || file.fieldname.startsWith('panelImage')) {
      cb(null, true);
    } else {
      cb(new Error('Unexpected field'), false);
    }
  };
  
  const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter
  });


// Get all content
router.get('/content', contentController.getAllContent);

// Get content by ID
router.get('/content/:id', contentController.getContentById);

// Create new content
router.post('/content', upload.any(), contentController.createContent);

// Update content by ID
router.put('/content/:id', upload.any(), contentController.updateContent);

// Delete content by ID
router.delete('/content/:id', contentController.deleteContent);

router.get('/content/system/:slug', contentController.getContentBySystemSlug);

router.put('/content/system/:slug', contentController.updateContentBySystemSlug);

router.delete('/content/system/:slug', contentController.deleteContentBySystemSlug);

router.get('/contentdetail/:systemId', contentController.getContentBySystemId);

module.exports = router;

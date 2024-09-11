const Rating = require('../Models/Rating');

// Create a new rating
exports.createRating = async (req, res) => {
  try {
    const { title, alt_tag, rating } = req.body;
    const logo = req.file ? req.file.path : ''; // Multer handles the logo file upload

    const newRating = new Rating({
      title,
      logo,
      alt_tag,
      rating
    });

    const savedRating = await newRating.save();
    res.status(201).json(savedRating);
  } catch (error) {
    res.status(500).json({ message: 'Error creating rating', error });
  }
};

// Get all ratings
exports.getRatings = async (req, res) => {
  try {
    const ratings = await Rating.find();
    res.status(200).json(ratings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ratings', error });
  }
};

// Get rating by ID
exports.getRatingById = async (req, res) => {
  try {
    const rating = await Rating.findById(req.params.id);
    if (!rating) {
      return res.status(404).json({ message: 'Rating not found' });
    }
    res.status(200).json(rating);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rating', error });
  }
};

// Update rating by ID (with upsert)
exports.updateRatingById = async (req, res) => {
  try {
    const { title, alt_tag, rating } = req.body;
    const logo = req.file ? req.file.path : undefined; // Multer handles the logo file upload

    const updateData = { title, alt_tag, rating };
    if (logo) updateData.logo = logo;

    const updatedRating = await Rating.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json(updatedRating);
  } catch (error) {
    res.status(500).json({ message: 'Error updating rating', error });
  }
};

// Delete rating by ID
exports.deleteRatingById = async (req, res) => {
  try {
    const deletedRating = await Rating.findByIdAndDelete(req.params.id);
    if (!deletedRating) {
      return res.status(404).json({ message: 'Rating not found' });
    }
    res.status(200).json({ message: 'Rating deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting rating', error });
  }
};

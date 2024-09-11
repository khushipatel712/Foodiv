const Review = require('../Models/Review'); // Adjust the path as needed

// Get all review data
exports.getReviews = async (req, res) => {
    try {
        const data = await Review.findOne();
        if (!data) {
            return res.status(404).json({ message: 'No data found' });
        }
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
exports.updateReviews = async (req, res) => {
    try {
        // console.log('Request body:', req.body);
        // console.log('Request files:', req.files);

        const { title, reviews } = req.body;
        const files = req.files || {};

        let existingData = await Review.findOne();

        if (!existingData) {
            existingData = new Review({ title: '', image: '', reviews: [] });
        }

        // Update title and image if provided
        existingData.title = title || existingData.title;
        const imageFile = files['image'] ? files['image'][0] : null;
        if (imageFile) {
            existingData.image = imageFile.filename;
        }

        // Process review items
        if (reviews && Array.isArray(reviews)) {
            const updatedReviews = [];

            reviews.forEach((review, index) => {
                const existingReview = existingData.reviews[index] || {};

                // If new data is provided, use it; otherwise, keep existing data
                const updatedReviewItem = {
                    title: review.title || existingReview.title,
                    alt_tag: review.alt_tag || existingReview.alt_tag,
                    name: review.name || existingReview.name,
                    address: review.address || existingReview.address,
                    review: review.review || existingReview.review,
                };

                // Find and assign the corresponding profile image file if exists
                const profileImageFieldName = `reviews[${index}][profile]`;
                const file = files[profileImageFieldName] ? files[profileImageFieldName][0] : null;
                if (file) {
                    updatedReviewItem.profile = file.filename;
                } else {
                    updatedReviewItem.profile = existingReview.profile;
                }

                updatedReviews.push(updatedReviewItem);
            });

            existingData.reviews = updatedReviews;
        }

        await existingData.save();

        res.status(200).json({ message: 'Reviews updated successfully!', data: existingData });
    } catch (error) {
        console.error('Error updating reviews:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};






// Remove a review item by ID
exports.removeReviewItem = async (req, res) => {
    try {
        const { itemId } = req.params;

        const data = await Review.findOneAndUpdate(
            {}, // Use a filter to identify the document, or leave empty to target the first document found
            {
                $pull: { reviews: { _id: itemId } } // Remove the review item by its ID
            },
            { new: true }
        );

        if (!data) {
            return res.status(404).json({ message: 'Review item not found' });
        }

        res.status(200).json({ message: 'Review item removed successfully!', data });
    } catch (error) {
        console.error('Error removing review item:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

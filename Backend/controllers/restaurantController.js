const Restaurant = require('../Models/Restaurants'); // Adjust the path as needed

// Get all restaurant data
exports.getRestaurants = async (req, res) => {
    try {
        const data = await Restaurant.findOne();
        if (!data) {
            return res.status(404).json({ message: 'No data found' });
        }
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Update or create restaurant data
exports.updateRestaurants = async (req, res) => {
    try {
        const { total_restaurants, restaurants } = req.body;
        const logo = req.file ? req.file.path : undefined;

        // Assuming you want to update or create a single document
        let updatedData;
        if (logo) {
            updatedData = await Restaurant.findOneAndUpdate(
                {},
                { total_restaurants, restaurants: [...restaurants, { logo }] },
                { new: true, runValidators: true, upsert: true }
            );
        } else {
            updatedData = await Restaurant.findOneAndUpdate(
                {},
                { total_restaurants, restaurants },
                { new: true, runValidators: true, upsert: true }
            );
        }
        res.json(updatedData);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

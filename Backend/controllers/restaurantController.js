const Restaurant = require('../Models/Restaurants'); // Adjust the path as needed

// Get all restaurant data
exports.getRestaurants = async (req, res) => {
    try {
        const data = await Restaurant.findOne();
    
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Update or create restaurant data
exports.updateRestaurants = async (req, res) => {
  try {
      console.log('Request body:', req.body);
      console.log('Request files:', req.files);

      const { total_restaurants, restaurants } = req.body;
      const files = req.files || [];

      let existingData = await Restaurant.findOne();

      if (!existingData) {
          existingData = new Restaurant({ total_restaurants: 0, restaurants: [] });
      }

      // Update total_restaurants
      existingData.total_restaurants = parseInt(total_restaurants, 10);

      // Process new restaurants
      if (restaurants && Array.isArray(restaurants)) {
          for (let i = 0; i < restaurants.length; i++) {
              const newRest = restaurants[i];
              if (!newRest.title || !newRest.alt_tag) {
                  return res.status(400).json({ message: 'Title and alt_tag are required for each restaurant.' });
              }

              const newRestaurant = {
                  title: newRest.title,
                  alt_tag: newRest.alt_tag,
              };

              // Find the corresponding file
              const file = files.find(f => f.fieldname === `restaurants[${i}][logo]`);
              if (file) {
                  newRestaurant.logo = file.filename;
              } else if (newRest.logo) {
                  newRestaurant.logo = newRest.logo;
              } else {
                  return res.status(400).json({ message: 'Logo is required for each restaurant.' });
              }

              existingData.restaurants.push(newRestaurant);
          }
      }

      await existingData.save();

      res.status(200).json({ message: 'Restaurants updated successfully!', data: existingData });
  } catch (error) {
      console.error('Error updating restaurants:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.removeRestaurant = async (req, res) => {
  try {
      const { restaurantId } = req.params; 

      
      const data = await Restaurant.findOneAndUpdate(
          {}, // Use a filter to identify the document, or leave empty to target the first document found
          {
              $pull: { restaurants: { _id: restaurantId } } // Remove the restaurant entry by its ID
          },
          { new: true }
      );

      if (!data) {
          return res.status(404).json({ message: 'Restaurant not found' });
      } 

      res.status(200).json({ message: 'Restaurant removed successfully!', data });
  } catch (error) {
      console.error('Error removing restaurant:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
  }
};
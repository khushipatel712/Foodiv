const JoinFoodiv = require('../Models/JoinFoodiv');


exports.getJoinFoodiv = async (req, res) => {
  try {
    const joinFoodiv = await JoinFoodiv.findOne(); // Fetch the only entry
    if (!joinFoodiv) {
      return res.status(404).json({ message: 'No entry found' });
    }
    res.status(200).json(joinFoodiv);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


exports.updateJoinFoodiv = async (req, res) => {
  const { title, description, altTag } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const updateData = {
      title,
      description,
      altTag,
    };

    if (image) {
      updateData.image = image;
    }

    const joinFoodiv = await JoinFoodiv.findOneAndUpdate(
      {},
      { $set: updateData },
      { new: true, upsert: true } // upsert option ensures creation if not found
    );

    res.status(200).json({ message: 'Entry updated or created successfully', joinFoodiv });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

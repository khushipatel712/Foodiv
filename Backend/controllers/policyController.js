const Policies = require('../Models/Policy'); // Import your Policies model

// GET request to fetch policies
exports.getPolicies = async (req, res) => {
    try {
        const policies = await Policies.findOne(); // Fetch the policies from the database
        res.json(policies);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching policies', error });
    }
};

// POST request to update policies
exports.updatePolicies = async (req, res) => {
    try {
        const { terms, privacy, shipping, cancellation } = req.body;
        const updateFields = {};

        if (terms) updateFields.terms = terms;
        if (privacy) updateFields.privacy = privacy;
        if (shipping) updateFields.shipping = shipping;
        if (cancellation) updateFields.cancellation = cancellation;

        const updatedPolicy = await Policy.findOneAndUpdate({}, updateFields, { new: true });
        res.status(200).json(updatedPolicy);
    } catch (error) {
        res.status(500).json({ message: "Error updating policies", error });
    }
};
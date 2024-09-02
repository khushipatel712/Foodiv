const express = require('express');
const Policy = require('../models/Policy'); // Assuming a Policy model is defined

// Create or update policy content
exports.savePolicy = async (req, res) => {
    const { policyType, content, adminId } = req.body;

    try {
        let policy = await Policy.findOne({ type: policyType });
        if (policy) {
            policy.content = content;
            policy.adminId = adminId;
            await policy.save();
        } else {
            policy = new Policy({ type: policyType, content, adminId });
            await policy.save();
        }

        res.status(200).json({ message: `${policyType} policy saved successfully`, policy });
    } catch (error) {
        console.error(`Error saving ${policyType} policy:`, error);
        res.status(500).json({ message: `Error saving ${policyType} policy`, error });
    }
};

// Get policy content by type
exports.getPolicy = async (req, res) => {
    const { adminId, policyType } = req.params;

    try {
        // Find policy based on adminId and policyType
        const policy = await Policy.findOne({ adminId, type: policyType });

        if (!policy) {
            // Return a blank response with status 200 if policy is not found
            return res.status(200).json({ content: '' });
        }

        // Return the found policy
        res.status(200).json({ content: policy.content });
    } catch (error) {
        console.error(`Error fetching ${policyType} policy for adminId ${adminId}:`, error);
        // Return a blank response with status 200 in case of an error
        res.status(200).json({ content: '' });
    }
};


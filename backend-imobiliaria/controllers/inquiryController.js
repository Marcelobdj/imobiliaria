const Inquiry = require('../models/Inquiry');

// Create a new inquiry
exports.createInquiry = async (req, res) => {
    const { propertyId, userId, message } = req.body;

    try {
        const newInquiry = new Inquiry({ propertyId, userId, message });
        await newInquiry.save();
        res.status(201).json(newInquiry);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all inquiries
exports.getAllInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find().populate('propertyId').populate('userId');
        res.status(200).json(inquiries);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get inquiry by ID
exports.getInquiryById = async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id).populate('propertyId').populate('userId');
        if (!inquiry) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }
        res.status(200).json(inquiry);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete inquiry
exports.deleteInquiry = async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id);
        if (!inquiry) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }
        await inquiry.remove();
        res.status(200).json({ message: 'Inquiry deleted' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};
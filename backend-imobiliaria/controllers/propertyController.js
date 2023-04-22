const Property = require('../models/Property');

// Create a new property
exports.createProperty = async (req, res) => {
    try {
        const newProperty = new Property({ ...req.body, createdBy: req.user.id });
        const property = await newProperty.save();
        res.json(property);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all properties
exports.getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find();
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get property by ID
exports.getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);

        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        res.json(property);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update property
exports.updateProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);

        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        if (property.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to update this property' });
        }

        const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProperty);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete property
exports.deleteProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);

        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        if (property.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to delete this property' });
        }

        await Property.findByIdAndRemove(req.params.id);
        res.json({ message: 'Property deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
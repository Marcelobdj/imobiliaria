const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    propertyType: {
        type: String,
        enum: ['house', 'land', 'business'],
        required: true,
    },
    transactionType: {
        type: String,
        enum: ['sale', 'rent'],
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    features: {
        type: Object,
    },
    images: [
        {
            type: String,
        },
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('Property', PropertySchema);
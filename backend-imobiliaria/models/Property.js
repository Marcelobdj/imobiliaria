const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        propertyType: String,
        transactionType: String,
        price: Number,
        location: {
            city: String,
            state: String,
            country: String,
            zipCode: String,
            address: String
        },
        features: {
            bedrooms: Number,
            bathrooms: Number,
            area: Number
        },
        images: [String],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        createdAt: Date,
        updatedAt: Date,
        isFeatured: Boolean
    }
);

module.exports = mongoose.model("Property", PropertySchema);
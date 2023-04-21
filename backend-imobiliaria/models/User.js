const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        password: String,
        role: String,
        favorites: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Property"
            }
        ],
        emailAlerts: {
            propertyType: [String],
            transactionType: [String],
            minPrice: Number,
            maxPrice: Number,
            location: [String]
        },
        createdAt: Date,
        updatedAt: Date
    }
);

module.exports = mongoose.model("User", UserSchema);
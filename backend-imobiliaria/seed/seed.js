const mongoose = require('mongoose');
const User = require('../models/User');
const Property = require('../models/Property');
const Inquiry = require('../models/Inquiry');

mongoose.connect('mongodb://mongodb://206.189.200.26:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const seedDatabase = async () => {
    try {
        // Insert users
        const users = [
            {
                name: "John Doe",
                email: "john.doe@example.com",
                password: "hashed_password", // Replace with an actual hashed password
                role: "Registered User",
            },
            {
                name: "Jane Smith",
                email: "jane.smith@example.com",
                password: "hashed_password", // Replace with an actual hashed password
                role: "Agent/Property Owner",
            },
        ];

        const createdUsers = await User.insertMany(users);

        // Insert properties
        const properties = [
            {
                title: "Sample House",
                description: "A beautiful sample house.",
                propertyType: "house",
                transactionType: "sale",
                price: 300000,
                location: "Sample City",
                features: {
                    bedrooms: 3,
                    bathrooms: 2,
                },
                images: ["image1.jpg", "image2.jpg"],
                createdBy: createdUsers[1]._id, // Link property to the second user (Jane Smith)
            },
        ];

        const createdProperties = await Property.insertMany(properties);

        // Insert inquiries
        const inquiries = [
            {
                propertyId: createdProperties[0]._id, // Link inquiry to the first property
                userId: createdUsers[0]._id, // Link inquiry to the first user (John Doe)
                message: "I am interested in this property. Can you tell me more?",
            },
        ];

        const createdInquiries = await Inquiry.insertMany(inquiries);

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
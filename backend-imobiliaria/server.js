const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize the app
const app = express();

// Apply middlewares
app.use(cors());
app.use(express.json());

// Connect to the MongoDB database
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).then(() => {
    console.log('Connected to MongoDB.');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
});

// Add routes here
app.use(express.json());

// Use the routes as middleware
app.use('/api/users', userRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/inquiries', inquiryRoutes);


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
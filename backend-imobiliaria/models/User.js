const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['guest', 'registered', 'agent', 'admin'],
        default: 'guest',
    },
    favorites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Property',
        },
    ],
    emailAlerts: {
        type: Object,
    },
});

module.exports = mongoose.model('User', UserSchema);
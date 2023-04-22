const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register a new user
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            name,
            email,
            password: hashedPassword,
        });

        await user.save();

        // Generate and send the JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 3600 });
        res.status(201).json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Log in a user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate and send the JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 3600 });
        res.status(200).json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
    const { name, email, password, role, favorites, emailAlerts } = req.body;

    try {
        let user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.role = role || user.role;
        user.favorites = favorites || user.favorites;
        user.emailAlerts = emailAlerts || user.emailAlerts;

        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;
        }

        await user.save();
        res.status(200).json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete user profile
exports.deleteUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.remove();

        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all users (admin-specific route)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get user by ID (admin-specific route)
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update user (admin-specific route)
exports.updateUser = async (req, res) => {
    const { name, email, password, role, favorites, emailAlerts } = req.body;

    try {
        let user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.role = role || user.role;
        user.favorites = favorites || user.favorites;
        user.emailAlerts = emailAlerts || user.emailAlerts;

        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;
        }

        await user.save();
        res.status(200).json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete user (admin-specific route)
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.remove();
        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
};
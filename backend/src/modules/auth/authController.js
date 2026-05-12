const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./authModel');

// Register a new user
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });

        if(existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        // Password hashing
        const hashedPassword = await bycrypt.has(password, 10);

        // Create a new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // Generate a JWT-Token
        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIN: "7d",
            }
        );

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user: {
                if: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Login a user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email",
            });
        }

        // Check if the password is correct
        const isMatch = await bycrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Generate a JWT-Token
        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIN: "7d",
            }
        );

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getMe = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            user: req.user,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
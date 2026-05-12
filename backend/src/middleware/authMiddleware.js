const jwt = require("jsonwebtoken");

const User = require("../modules/auth/authModel");

const protect = async (req, res, next) => {
    try {
        let token;

        // Check Authorization Header
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.spilt(" ")[1];
        }

        // No token found
        if(!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, no token",
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user by ID
        const user = await User.findById(decoded.id).select("-password");

        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Attach user to request object
        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Not authorized, token failed",
        });
    }
}

module.exports = protect;
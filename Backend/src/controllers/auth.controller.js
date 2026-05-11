const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const toeknBlacklistModel = require("../models/blacklistToken");

/**
 * @name registerUserController
 * @desc Register new user
 * @route POST /api/auth/register
 * @access Public
 */
async function registerUserController(req, res) {
    try {
        const { username, email, password } = req.body;

        // 🔹 1. Validate input fields
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // 🔹 2. Check if user already exists
        const existingUser = await userModel.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email or username"
            });
        }

        // 🔹 3. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 🔹 4. Create user
        const user = await userModel.create({
            username,
            email,
            password: hashedPassword
        });

        // 🔹 5. Generate JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // 🔹 6. Send token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false // true in production (HTTPS)
        });

        // 🔹 7. Send response
        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

/**
 * @name loginUserController
 * @desc Login user
 * @route POST /api/auth/login
 * @access Public
 */
async function loginUserController(req, res) {
    try {
        const { email, password } = req.body;

        // 🔹 1. Validate input
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // 🔹 2. Check user exists
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        // 🔹 3. Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }
        console.log("User is :", user._id);

        // 🔹 4. Generate token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // 🔹 5. Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false
        });

        // 🔹 6. Send response
        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}


/**
 * @name LogoutController
 * @desc logout from the cokie and add the token to the blacklist 
 * @route Get /api/auth/logout
 * @access Public
 */
async function logoutUserController(req,res){
    try{
        const token=req.cookies.token;
        if(!token){
            return res.status(400).json({
                message:"No token found",
            });
        }
        // add token to blacklist
        await toeknBlacklistModel.create({token});
        // clear cookie
        res.clearCookie("token");
        res.status(200).json({
            message:"User logged out successfully"
        })
    }catch(error){
        console.error(error);
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

/**
 * @name getMeController
 * @desc Get current user data
 * @route Get /api/auth/get-me  
 */
async function getMeController(req, res) {
    try {
        const token = req.cookies.token;

        // ✅ 1. token check पहले करो
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // ✅ 2. verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // ✅ 3. user fetch
        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // ✅ 4. response
        res.status(200).json({
            message: "User data retrieved successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (err) {
        console.error(err);
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}

// ✅ Export controllers
module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController,
};
const jwt = require("jsonwebtoken");
const toeknBlacklistModel=require("../models/blacklistToken.js");
async function authUser(req, res, next) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized token not found"
            })
        };
        // check if token is blacklisted
        const isBlacklisted = await toeknBlacklistModel.findOne({
            token
        })
        if (isBlacklisted) {
            return res.status(401).json({
                message: "Unauthorized token is blacklisted"
            })
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;;
        next();
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}
module.exports = { authUser };
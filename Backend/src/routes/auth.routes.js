const exprees = require("express");
const authRouter = exprees.Router();
const authController = require("../controllers/auth.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js");


/**
 * @route Post /api/auth/register
 * @description Register a new user
 * @access Public
*/

authRouter.post("/register", authController.registerUserController);

/**
 * @route Post api/auth/Login
 * @description Login a user
 * @access Public
 * */
authRouter.post("/login", authController.loginUserController);

/**
 * @route get api/auth/logot
 * @description clear the token from the cookie and add the token to the blacklist
 * @access public
 * */
authRouter.get("/logout", authController.logoutUserController);

/**
* @route Get /api/auth/get-me
* @descritption get the current user data
* @access Private
**/

authRouter.get("/get-me",authMiddleware.authUser,authController.getMeController);

module.exports = authRouter;
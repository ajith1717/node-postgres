const express = require("express");
const router = express.Router();

const userController = require("../../controllers/user");
const { validateUserSignup, validateUserLogin } = require("../../validations/validators");


// API for sign up user
router.post("/signup", validateUserSignup, userController.userSignup);

// API for login user
router.post("/login", validateUserLogin, userController.userLogin);

module.exports = router;

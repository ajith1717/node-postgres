const express = require("express");
const router = express.Router();

const userController = require("../../controllers/user");
const { validateUserSignup } = require("../../validations/validators");


router.post("/signup", validateUserSignup, userController.userSignup);
router.post("/logout", userController.userLogout);
module.exports = router;

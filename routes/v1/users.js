const express = require("express");
const router = express.Router();

const userController = require("../../controllers/user");
const { validateGuardianMobileNumber, validateOTPVerifyPayload } = require("../../validations/validators");


router.post("/signup", userController.userSignup);
router.post("/otp/send", [validateGuardianMobileNumber], userController.sendSMSOtp);
router.post("/otp/verify", [validateOTPVerifyPayload], userController.verifySMSOtp);
router.post("/otp/resend", [validateGuardianMobileNumber], userController.resendSMSOtp);
router.post("/location", userController.setUserLocationDetails);
router.get("/test", userController.testAPI)
router.put("/profile", userController.updateUserProfile)
router.post("/logout", userController.userLogout);
router.delete("/account", userController.deleteUserAccount);
module.exports = router;

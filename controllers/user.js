const { validationResult } = require("express-validator");
const { logger, errorLogger } = require("../config/pino-config");
const { HTTP_STATUS_CODE, errorSource } = require("../constants/general")
const { userSignup, sendSMSOtp, verifySMSOtp, resendSMSOtp, setUserLocationDetails, editUserProfile, userLogout, deleteUserAccount } = require("../services/users/user")
const { ValidationError } = require("../errorHandlers/validationErrorHandler");
const { formatValidationErrorMessages } = require("../validations/validators");
// API for user signup
exports.userSignup = async (req, res) => {
    try {
        //   const errors = validationResult(req)
        //   if (errors.errors.length > 0) {
        //     errors.source = errorSource.INPUT_VALIDATION.name
        //     throw (errors)

        //   }
        logger.info({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { ...req.body } }, `New User Signup Request received`)
        let result = await userSignup(req.body);
        if (result.success) {
            logger.info({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { ...req.body } }, `User successfully registered.`)
            res.status(HTTP_STATUS_CODE.OK).json(result)
        } else {
            errorLogger.error({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { ...req.body } }, `Error occurred during Signup`);
            if (result.errorCode === HTTP_STATUS_CODE.CONFLICT) {
                res.status(HTTP_STATUS_CODE.CONFLICT).json(result)
                return
            }
            err = formatValidationErrorMessages(result.err || result.error || result.errors)
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(result);
            return;
        }
    } catch (err) {
        console.log('err', err)
        errorLogger.error({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { name: req.body.name, email: req.body.email, error: err.toString() } }, `Error occurred during Signup`);
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(({ success: false, msg: "Error occurred during Signup", errors: err }))
    }
}



// API for sending otp 
exports.sendSMSOtp = async (req, res) => {
    try {
        logger.info({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { ...req.body } }, `Request received for sending OTP to phone number`)
        const errors = validationResult(req)
        if (errors.errors.length > 0) {
            errors.source = errorSource.INPUT_VALIDATION.name
            console.log('errors', errors)
            throw new ValidationError("Invalid phone number.")
        }
        let { phoneNumber, countryCode } = req.body
        let result = await sendSMSOtp({ phoneNumber, countryCode });
        if (result.success) {
            logger.info({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { ...req.body } }, `Successfully sent OTP to phone number`)
            res.status(HTTP_STATUS_CODE.OK).json(result)
        } else {
            errorLogger.error({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { ...req.body } }, `Error occurred during sending OTP`);
            if (result.errorCode === HTTP_STATUS_CODE.CONFLICT) {
                res.status(HTTP_STATUS_CODE.CONFLICT).json(result)
                return;
            }
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(result);
            return
        }
    } catch (err) {
        console.log('err', err)
        err = formatValidationErrorMessages(err)
        errorLogger.error({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { name: req.body.name, email: req.body.email, error: err.toString() } }, `Error occurred during sending otp`);
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(({ success: false, msg: "Error occurred during sending OTP", data: {}, errors: err }))
    }
}


// function used to verify the otp
exports.verifySMSOtp = async (req, res) => {
    try {
        logger.info({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { ...req.body } }, `verify otp  Request received`)
        let result = await verifySMSOtp(req.body);
        if (result.success) {
            logger.info({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { ...req.body } }, `otp verified successfully`)
            res.status(HTTP_STATUS_CODE.OK).json(result)
        } else {
            errorLogger.error({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { ...req.body } }, `Error occurred during verifying otp`);
            if (result.errorCode === HTTP_STATUS_CODE.CONFLICT) {
                res.status(HTTP_STATUS_CODE.CONFLICT).json(result)
                return;
            }
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(result);
            return
        }
    } catch (err) {
        console.log('err', err)
        errorLogger.error({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { name: req.body.name, email: req.body.email, error: err.toString() } }, `Error occurred during verifying otp`);
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(({ success: false, msg: "Error occurred during verifying otp", errors: err }))
    }
}



// function used to verify the otp
exports.resendSMSOtp = async (req, res) => {
    try {
        logger.info({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { ...req.body } }, `verify otp  Request received`)
        const errors = validationResult(req)
        if (errors.errors.length > 0) {
            errors.source = errorSource.INPUT_VALIDATION.name
            console.log('errors', errors)
            throw new ValidationError("Invalid phone number.")
        }
        let result = await resendSMSOtp(req.body);
        if (result.success) {
            logger.info({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { ...req.body } }, `otp verified successfully`)
            res.status(HTTP_STATUS_CODE.OK).json(result)
        } else {
            errorLogger.error({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { ...req.body } }, `Error occurred during verifying otp`);
            if (result.errorCode === HTTP_STATUS_CODE.CONFLICT) {
                res.status(HTTP_STATUS_CODE.CONFLICT).json(result)
                return;
            }
            err = formatValidationErrorMessages(result.err || result.error || result.errors)
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(result);
            return
        }
    } catch (err) {
        console.log('err', err)
        err = formatValidationErrorMessages(err)
        errorLogger.error({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { name: req.body.name, email: req.body.email, error: err.toString() } }, `Error occurred during verifying otp`);
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(({ success: false, msg: "Error occurred during verifying otp", errors: err }))
    }
}

// API for set the user location details from dashboard
exports.setUserLocationDetails = async (req, res) => {
    try {
        logger.info({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { ...req.body } }, `Request received for setting the location details of a user`)
        let result = await setUserLocationDetails(req.body);
        if (result.success) {
            logger.info({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { ...req.body } }, `Successfully set location details for the user`)
            res.status(HTTP_STATUS_CODE.OK).json(result)
        } else {
            errorLogger.error({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { ...req.body } }, `Error occurred during setting location details for the user`);
            if (result.errorCode === HTTP_STATUS_CODE.CONFLICT) {
                res.status(HTTP_STATUS_CODE.CONFLICT).json(result)
                return;
            }
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(result);
            return
        }
    } catch (err) {
        console.log('err', err)
        errorLogger.error({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { name: req.body.name, email: req.body.email, error: err.toString() } }, `Error occurred during verifying otp`);
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(({ success: false, msg: "Error occurred during verifying otp", errors: err }))
    }
}


// API for update the user profile details
exports.updateUserProfile = async (req, res) => {
    try {
        logger.info({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { ...req.body } }, `Request received for updating the user profile details`)
        let result = await editUserProfile(req.body);
        if (result.success) {
            logger.info({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { ...req.body } }, `Successfully update updating the user profile details`)
            res.status(HTTP_STATUS_CODE.OK).json(result)
        } else {
            errorLogger.error({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { ...req.body } }, `Error occurred during updating the user profile details`);
            if (result.errorCode === HTTP_STATUS_CODE.CONFLICT) {
                res.status(HTTP_STATUS_CODE.CONFLICT).json(result)
                return;
            }
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(result);
            return
        }
    } catch (err) {
        console.log('err', err)
        errorLogger.error({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { name: req.body.name, email: req.body.email, error: err.toString() } }, `Error occurred updating the user profile details`);
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(({ success: false, msg: "Error occurred updating the user profile details", errors: err }))
    }
}

// API for update the user profile details
exports.userLogout = async (req, res) => {
    try {
        logger.info({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { ...req.body } }, `Request received for user logout`)
        let result = await userLogout(req.body);
        if (result.success) {
            logger.info({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { ...req.body } }, `Successfully update user logout`)
            res.status(HTTP_STATUS_CODE.OK).json(result)
        } else {
            errorLogger.error({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { ...req.body } }, `Error occurred during user logout`);
            if (result.errorCode === HTTP_STATUS_CODE.CONFLICT) {
                res.status(HTTP_STATUS_CODE.CONFLICT).json(result)
                return;
            }
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(result);
            return
        }
    } catch (err) {
        console.log('err', err)
        errorLogger.error({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { name: req.body.name, email: req.body.email, error: err.toString() } }, `Error occurred user logout`);
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(({ success: false, msg: "Error occurred user logout", errors: err }))
    }
}


// API for delete user account 
exports.deleteUserAccount = async (req, res) => {
    try {
        logger.info({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { ...req.body } }, `Request received for deleting user account`)
        let result = await deleteUserAccount(req.body);
        if (result.success) {
            logger.info({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { ...req.body } }, `Successfully update deleting user account`)
            res.status(HTTP_STATUS_CODE.OK).json(result)
        } else {
            errorLogger.error({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { ...req.body } }, `Error occurred during deleting user account`);
            if (result.errorCode === HTTP_STATUS_CODE.CONFLICT) {
                res.status(HTTP_STATUS_CODE.CONFLICT).json(result)
                return;
            }
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(result);
            return
        }
    } catch (err) {
        console.log('err', err)
        errorLogger.error({ clientIP: req.socket.remoteAddress, api: req.originalUrl, data: { name: req.body.name, email: req.body.email, error: err.toString() } }, `Error occurred deleting user account`);
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(({ success: false, msg: "Error occurred deleting user account", errors: err }))
    }
}


exports.testAPI = async (req, res, next) => {
    console.log('Test api')
    res.status(HTTP_STATUS_CODE.OK).json({ success: true, msg: 'test api response ', data: { key: "value" } })

}

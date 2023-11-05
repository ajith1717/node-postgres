const { validationResult } = require("express-validator");
const { HTTP_STATUS_CODE, errorSource } = require("../constants/general")
const { userSignup, userLogout, userLogin } = require("../services/users/user")
const { formatValidationErrorMessages } = require("../validations/validators");


// API for user signup
exports.userSignup = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (errors.errors.length > 0) {
            errors.source = errorSource.INPUT_VALIDATION.name
            throw (errors)

        }
        let result = await userSignup(req.body);
        if (result.success) {
            res.status(HTTP_STATUS_CODE.OK).json(result)
        } else {
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
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(({ success: false, msg: "Error occurred during Signup", errors: err }))
    }
}


// API for user login
exports.userLogin = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (errors.errors.length > 0) {
            errors.source = errorSource.INPUT_VALIDATION.name
            throw (errors)
        }
        let result = await userLogin(req.body);
        if (result.success) {
            res.status(HTTP_STATUS_CODE.OK).json(result)
        } else {
            if (result.errorCode === HTTP_STATUS_CODE.CONFLICT) {
                res.status(HTTP_STATUS_CODE.CONFLICT).json(result)
                return;
            }
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(result);
            return
        }
    } catch (err) {
        console.log('err', err)
        res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(({ success: false, msg: "Error occurred during Login", errors: err }))
    }
}




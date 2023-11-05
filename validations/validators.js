const { check } = require("express-validator");
const { errorLogger } = require("../config/pino-config");
const { errorSource } = require("../constants/general");

// Function for validate guardian mobile number signup 
exports.validateGuardianMobileNumber = [
    // check("guardianId", "GuardianId is required").exists(),
    check("phoneNumber", "Phone number is required").exists().withMessage({ msg: "Phone number is required", field: "phone" }),
    check("countryCode", "Country code is required").exists().withMessage({ msg: "Country code is required", field: "countryCode" }),
    check("phoneNumber", "Phone number must not be empty").trim().not().isEmpty().withMessage({ msg: "Phone number must not be empty", field: "phone" }),
    check("countryCode", "Country code must not be empty").trim().not().isEmpty().withMessage({ msg: "Country code must not be empty", field: "countryCode" }),
    check("phoneNumber").trim().exists().isMobilePhone().withMessage({ msg: "Invalid phone number", field: "phone" }),
    // check("guardianId", "GuardianId must not be empty").trim().not().isEmpty(),
]

// Function for validate guardian mobile number signup 
exports.validateOTPVerifyPayload = [
    check("phoneNumber", "Phone number is required").exists().withMessage({ msg: "Phone number is required", field: "phone" }),
    check("countryCode", "Country code is required").exists().withMessage({ msg: "Country code is required", field: "countryCode" }),
    check("phoneNumber", "Phone number must not be empty").trim().not().isEmpty().withMessage({ msg: "Phone number must not be empty", field: "phone" }),
    check("countryCode", "Country code must not be empty").trim().not().isEmpty().withMessage({ msg: "Country code must not be empty", field: "countryCode" }),
    check("phoneNumber").trim().exists().isMobilePhone().withMessage({ msg: "Invalid phone number", field: "phone" }),
    check("otp", "OTP must not be empty").trim().not().isEmpty().withMessage({ msg: "OTP number must not be empty", field: "otp" }),

]

// Function for validate user signup request
exports.validateUserSignup = [
    check("name", "Name must not be empty").trim().escape().not().isEmpty().withMessage({ msg: "Name must not be empty", field: "name" }),
    check("name", "Name must be more than 2 characters").trim().escape().isLength({ min: 2 }).withMessage({ msg: "Name must be more than 2 characters", field: "name" }),
    check("email").trim().not().isEmpty().withMessage({ msg: "Email address must not be empty", field: "password" }),
    check("email", "Invalid email address").trim().isEmail().withMessage({ msg: "Invalid email address", field: "email" }),
    check("password", "Password must not be empty").trim().not().isEmpty().withMessage({ msg: "Password must not be empty", field: "password" }),
    check("password").trim().isLength({ min: 6 }).withMessage({ msg: "Password must be more than 6 characters", field: "password" }),
    check("password").trim().not().isEmpty().isLength({ max: 20 }).withMessage({ msg: "Password must not be more than 20 characters", field: "password" }),
    // check("password", "Password should be alpha numeric").trim().not().isEmpty().matches(/(?=.*[0-9])(?=.*[a-zA-Z]).{6,20}/).withMessage({ msg: "Password should be alpha numeric", field: "password" }),
]



exports.formatValidationErrorMessages = (error) => {
    try {
        let formattedError = []
        // console.log('error', error)
        // check the error is originated from the API INPUT VALIDATION 
        if (error.source === errorSource.INPUT_VALIDATION.name) {
            // format the error
            let err = error.mapped()
            if (err._error) {
                err._error.nestedErrors.forEach(element => {
                    formattedError.push({
                        type: errorSource.INPUT_VALIDATION.name,
                        message: element.msg.msg,
                        code: "",
                        field: element.msg.field
                    })
                });
            } else {
                Object.entries(err).forEach(([key, value]) => {
                    formattedError.push({
                        type: errorSource.INPUT_VALIDATION.type,
                        message: value.msg.msg,
                        code: "",
                        field: value.msg.field
                    })
                });

            }
            return formattedError;
        } else {
            // console.log(error)
            if (error.length > 0) {
                return error
            } else {
                formattedError = [{
                    type: "",
                    message: error.text ? error.text : error.message,
                    description: error.toString(),
                    code: ""
                }]
                return formattedError
            }
        }
    } catch (err) {
        console.log('err', err)
        errorLogger.error({ data: { error: error } }, `Error occurred during formatting validation error messages`);
        throw err;
    }
}
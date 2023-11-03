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
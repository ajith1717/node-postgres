const { UserPrivilegesList, HTTP_STATUS_CODE } = require("../../constants/general")
const { ONE_YEAR_IN_SECONDS } = require("../../constants/timeAndLimit")
const { findUserByPayload, updateUserDetailsByPhone, updateUserDetailsByUserId, deleteUserByUserId } = require("../../data-access/user")
const { signJWTToken } = require("../../utils/utils")
const phoneValidator = require("awesome-phonenumber")
const { errorLogger } = require("../../config/pino-config")



// Function for user signup
exports.userSignup = async (payload) => {
    try {
        // check the guardian exist or not with email 
        // if exist then return error
        // else create the user
        let userDetails = await findUserByPayload({ email: payload.email })
        if (userDetails.success) {
            // if user exist then return error
            if (userDetails.data != null) {
                return {
                    success: false,
                    msg: "User email already exist with this email",
                    errorCode: HTTP_STATUS_CODE.CONFLICT
                }
            } else {
                // if user not exist then create the user
                let result = await updateUserDetailsByPhone(payload)
                if (result.success) {
                    return {
                        success: true,
                        data: {
                            userDetails: {
                                userId: result.data._id,
                                firstName: result.data.firstName,
                                lastName: result.data.lastName,
                                email: result.data.email,
                                countryCode: result.data.countryCode,
                                phone: result.data.phone,
                                lat: result.data.lat,
                                long: result.data.long
                            }
                        },
                        msg: "Successfully signed up"
                    }
                } else {
                    return {
                        success: false,
                        data: {},
                        msg: "Failed to sign up"
                    }
                }
            }
        } else {
            return userDetails
        }

    } catch (error) {
        console.log('error', error)
        throw error;
    }
}



// Function for send otp
exports.sendSMSOtp = async ({ phoneNumber, countryCode }) => {
    try {
        // validate phone number 
        let phoneNumberValidation = await phoneValidator(countryCode + phoneNumber)
        if (phoneNumberValidation.isValid()) {
            let result = await generateOTPAndSendToPhoneNumber({ countryCode, phoneNumber })
            if (result.success) {
                return {
                    success: true,
                    data: result.data,
                    msg: "OTP sent successfully"
                }
            } else {
                return {
                    success: false,
                    data: {},
                    msg: "Failed to send OTP"
                }
            }
        } else {
            // throw error
            throw new Error("Invalid phone number")
        }

    } catch (error) {
        console.log('error', error)
        throw error;
    }
}






// Function for verify otp
exports.verifySMSOtp = async (payload) => {
    try {
        // verify OTP
        let verification = await verifyOTP(payload)
        if (verification.success) {
            let tokenPayload = {
                _id: verification.data._id,
                // countryCode: payload.countryCode
            }
            let token = await signJWTToken(tokenPayload, { expiresIn: ONE_YEAR_IN_SECONDS })
            return {
                success: true,
                data: {
                    userData: {
                        userId: verification.data._id,
                        name: verification.data.name,
                        email: verification.data.email,
                        countryCode: verification.data.countryCode,
                        phone: verification.data.phoneNumber,
                        token: token,
                        lat: verification.data.lat,
                        long: verification.data.long
                    }
                },
                msg: "Successfully logged in"
            }
        } else {
            return {
                success: false,
                msg: "Invalid OTP",
                data: {}
            }
        }
    } catch (error) {
        console.log('error', error)
    }
}


// function used to resend otp
exports.resendSMSOtp = async (payload) => {
    try {
        let result = await resendOtp(payload)
        if (result.success) {
            return {
                success: true,
                data: result.data,
                msg: "OTP sent successfully"
            }
        } else {
            return {
                success: false,
                data: {},
                msg: "Failed to resend OTP",
            }
        }
    } catch (err) {
        console.log(err)
        throw err
    }
}

// function used to update user details 
exports.updateUserDetailsByGivenPayload = (payload) => {
    try {

    } catch (error) {
        console.log(error)
        return error
    }
}

// Function for set location details of the user 
exports.setUserLocationDetails = async ({ userId, lat, long }) => {
    try {
        let updatePayload = { lat: lat, long: long }
        let result = await updateUserDetailsByUserId({ userId: userId, updatePayload })
        return result;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

// Function for initialize user privileges
exports.initializeUserPrivileges = async () => {
    try {
        Object.entries(UserPrivilegesList).forEach(([key, value]) => {
            let userPrivilegesObj = {
                userRole: value.userRole,
                privileges: value.privileges
            }
            createUserPrivileges(userPrivilegesObj)
        })
    } catch (error) {
        console.log(error)
        throw error;
    }
}

// Function for edit user details 
exports.editUserProfile = async (payload) => {
    try {
        let { firstName, lastName, email, userId } = payload;
        let updateResult = await updateUserDetailsByUserId({ userId: userId, payload: payload });
        if (updateResult.success) {
            return {
                success: true,
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email
                },
                msg: "Successfully updated user details"

            }
        } else {
            return {
                success: false,
                data: {
                },
                error: updateResult,
                msg: "Failed to update user details"
            }
        }


    } catch (error) {
        console.log('error', error)

    }
}

// Function for user logout 
exports.userLogout = async (payload) => {
    try {


        return {
            success: true,
            data: {},
            msg: "Successfully logged out "
        }
    } catch (error) {
        console.log('error', error)
        errorLogger.error(error)
        throw error;
    }
}

// Function for delete user account 
exports.deleteUserAccount = async (payload) => {
    try {
        let { userId } = payload;
        let userDelete = await deleteUserByUserId(userId)
        if (userDelete.success) {
            // delete the fcm details by user id 
            let fcmDeleteResult = await deleteFcmDetailsByUserId(userId);
            console.log('fcmDeleteResult', fcmDeleteResult)
        } else {
            console.log('error occurred during user delete', userDelete)
            return {
                success: false,
                data: {},
                msg: "Failed to delete user details"
            }
        }
        // delete user details by user id 
        // return result 

    } catch (error) {
        console.log('error', error)
        errorLogger.error(error)
        throw error;
    }
}
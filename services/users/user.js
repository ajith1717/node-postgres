const { UserPrivilegesList, HTTP_STATUS_CODE } = require("../../constants/general")
const { findUserByPayload, updateUserDetailsByPhone, updateUserDetailsByEmail } = require("../../data-access/user")



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
                let result = await updateUserDetailsByEmail(payload)
                if (result.success) {
                    return {
                        success: true,
                        data: {
                            userDetails: {
                                userId: result.data._id,
                                name: result.data.name,
                                email: result.data.email,
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
        throw error;
    }
}

const { UserPrivilegesList, HTTP_STATUS_CODE } = require("../../constants/general")
const { findUserByPayload, createUser } = require("../../data-access/user")
const { signJWTToken, bcryptPasswordMatch, generateBcryptPassword } = require("../../utils/utils")



// Function for user signup
exports.userSignup = async (payload) => {
    try {
        // check the guardian exist or not with email 
        // if exist then return error
        // else create the user
        let userDetails = await findUserByPayload({ email: payload.email })
        if (userDetails.success) {
            // if user exist then return error
            if (userDetails.data.length > 0) {
                return {
                    success: false,
                    msg: "User email already exist with this email",
                    errorCode: HTTP_STATUS_CODE.CONFLICT
                }
            } else {
                // encrypt the password
                let encPassword = await generateBcryptPassword(payload.password);
                payload.password = encPassword
                // if user not exist then create the user
                let result = await createUser(payload)
                if (result.success) {
                    let tokenPayload = {
                        email: result.data.email,
                    }
                    let token = await signJWTToken(tokenPayload, { expiresIn: "31536000s" })
                    return {
                        success: true,
                        data: {
                            userDetails: {
                                userId: result.data.id,
                                name: result.data.name,
                                token: token,
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


// function for user login 
exports.userLogin = async (payload) => {
    try {
        // check the user exist or not with email 
        // if exist then return error
        // else create the user
        let userDetails = await findUserByPayload({ email: payload.email })
        if (userDetails.success) {
            // if user exist then return error
            if (userDetails.data.length > 0) {
                // check password id correct or not
                let passwordMatch = await bcryptPasswordMatch(payload.password, userDetails.data ? userDetails.data[0].password : "");

                if (!passwordMatch) {
                    return {
                        success: false,
                        msg: "Incorrect password",
                        errorCode: HTTP_STATUS_CODE.UNAUTHORIZED
                    }
                }
                userDetails.data = userDetails.data[0]
                let tokenPayload = {
                    email: userDetails.data.email,
                }
                let token = await signJWTToken(tokenPayload, { expiresIn: "31536000s" })

                return {
                    success: true,
                    data: {
                        userDetails: {
                            userId: userDetails.data.id,
                            name: userDetails.data.name,
                            email: userDetails.data.email,
                            token: token
                        }
                    },
                    msg: "Successfully logged in"
                }
            } else {
                // if user not exist then return error
                return {
                    success: false,
                    msg: "User not exist with this email",
                    errorCode: HTTP_STATUS_CODE.NOT_FOUND
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


const { UserRoles } = require("../constants/general")
const Users = require("../models/postgres/user")

// Function for create user 
exports.createUser = (payload) => {
    return Users.create([payload]).then(result => {
        return {
            success: true,
            data: result,
            msg: "Successfully created User"
        }
    }).catch(error => {
        console.log(error)
        if (error.message.startsWith("E11000 duplicate key error collection: ") || error.code == 11000) {
            throw new Error("User already exists with the same email")
        }
        throw error
    })
}


// Function for fetch user by given payload
exports.findUserByUserRoles = (payload) => {
    return Users.aggregate([{
        '$match': {
            'userRole': {
                '$in': payload.userRole,
            }
        }
    }]).then(result => {
        return {
            success: true,
            data: result,
            msg: "Successfully fetched User"
        }
    }).catch(error => {
        console.log(error)
        throw error
    })
}

// function used to update user details by email
exports.updateUserDetailsByEmail = async (payload) => {
    return await Users.findOneAndUpdate({ email: payload.email }, payload, { upsert: true, new: true }).lean()
        .then(result => {
            return {
                success: true,
                data: result,
                msg: "Successfully updated User"
            }
        }).catch(error => {
            console.log(error)
            throw err
        })
}
//  Function for updating given user details by user id 
exports.updateUserDetailsByUserId = async ({ userId, payload }) => {
    return await Users.updateOne({ _id: userId }, payload)
        .then(result => {
            return {
                success: true,
                data: result,
                msg: "Successfully updated user details"
            }
        }).catch(error => {
            console.log(error)
            throw err
        })
}

// Function for find user details by email , pass and user role 
exports.findUserByEmailAndUserRoles = async ({ email, userRoles }) => {
    return await Users.findOne({ email: email, userRole: { $in: userRoles } }).lean()
        .then(result => {
            return {
                success: true,
                data: result,
                msg: "Successfully fetched the user details "
            }
        }).catch(error => {
            console.log(error)
            throw err
        })
}


// Function for find user details by email , pass and user role 
exports.findUserByPayload = async (payload) => {
    return await Users.findOne(payload).lean()
        .then(result => {
            return {
                success: true,
                data: result,
                msg: "Successfully fetched the user details "
            }
        }).catch(error => {
            console.log(error)
            throw err
        })
}


// function used to fetch users
exports.fetchUsers = async () => {
    try {
        let users = await Users.find()
        if (users) {
            return {
                success: true,
                data: users,
                msg: "Successfully fetched users"
            }
        } else {
            return {
                success: false,
                data: {},
                msg: "Failed to fetch users"
            }
        }
    } catch (error) {
        console.log('error', error)
        throw error
    }
}
// Function for delete user by user id 
exports.deleteUserByUserId = async (userId) => {
    return await Users.deleteOne({ _id: userId })
        .then(result => {
            return {
                success: true,
                data: result,
                msg: "Successfully deleted the user"
            }
        }).catch(error => {
            console.log('error', error)
            throw error
        })
}
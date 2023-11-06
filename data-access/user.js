const { UserRoles } = require("../constants/general")
const sequelize = require("../models/postgres")
const Users = require("../models/postgres/user")

// Function for create user 
exports.createUser = (payload) => {
    let createUser = Users.build(payload)
    return createUser.save().then(result => {
        return {
            success: true,
            data: result,
            msg: "Successfully created User"
        }
    }).catch(error => {
        console.log(error)
        throw error
    })
}

// Function for find user details by email , pass and user role 
exports.findUserByPayload = async (payload) => {
    return await sequelize.query(`SELECT * FROM users WHERE email = '${payload.email}'`, { type: sequelize.QueryTypes.SELECT })
        .then(result => {
            return {
                success: true,
                data: result,
                msg: "Successfully fetched the user details "
            }
        }).catch(error => {
            console.log(error)
            throw error
        })
}


// delete all users
exports.deleteAllUsers = async () => {
    return await sequelize.query(`DELETE FROM users`, { type: sequelize.QueryTypes.DELETE })
        .then(result => {
            return {
                success: true,
                data: result,
                msg: "Successfully deleted all users"
            }
        }).catch(error => {
            console.log(error)
            throw error
        })
}


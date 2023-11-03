const mongoose = require("mongoose");
const { mongoDbConn } = require('../../mongo')

const UserSchema = mongoose.Schema({
    name: { type: String, default: "" },
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    email: {
        type: String, trim: true, index: {
            unique: true,
            partialFilterExpression: { email: { $type: "string" } }
        }
    },
    password: { type: String, default: "" },
    countryCode: { type: String, require: true, default: "" },
    phoneNumber: { type: String, require: true, default: "" },
    isBlackListedUser: { type: Boolean, require: true, default: false },
    lastLoggedIn: { type: Date },
    isVerified: { type: Boolean, require: true, default: false },
    userRole: { type: String, },
    lat: { type: String, default: "" },
    long: { type: String, default: "" },
});

module.exports = Users = mongoDbConn.model("users", UserSchema);
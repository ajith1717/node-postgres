const bcrypt = require("bcryptjs");

// function for match login password with db pass using bcrypt
const bcryptPasswordMatch = async (plaintextPassword, encodedPassword) => {
    return bcrypt.compare(plaintextPassword, encodedPassword)
        .then(match => {
            if (match) {
                return match;
            } else {
                return false
            }
        }).catch(error => {
            console.log(`Error occurred during matching password`, error);
            return false;
        })
}
// Function for generate bcrypt password
const generateBcryptPassword = async (plainTextPassword) => {
    let saltRounds = 10;
    let hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
    return hashedPassword;
}
module.exports = {
    generateBcryptPassword,
    bcryptPasswordMatch
};


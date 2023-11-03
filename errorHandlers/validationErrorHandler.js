const { HTTP_STATUS_CODE } = require("../constants/general");

class ValidationError extends Error {

    constructor(message) {
        super()
        this.message = message;
        this.statusCode = HTTP_STATUS_CODE.BAD_REQUEST
    }
}

module.exports = {
    ValidationError
}
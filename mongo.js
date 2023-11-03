const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
// mongoose.set('debug', true);
// mongodb + srv://admin:adcb1234567890@ablemartcluster.j54rcz0.mongodb.net/?retryWrites=true&w=majority
const mongoDbConString = "mongodb+srv://admin:ablemartadmin4321@ablemart.fsyez9m.mongodb.net/ablemart?retryWrites=true&w=majority"
var mongoDbConn = mongoose.createConnection(mongoDbConString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

module.exports = {
    mongoDbConn
};

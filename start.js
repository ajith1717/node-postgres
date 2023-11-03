const { logger } = require("./config/pino-config");
const app = require("./server")
const dotenv = require('dotenv');
const { generateOTPAndSendToPhoneNumber } = require("./services/OTP/otp");
const { initializeUserPrivileges } = require("./services/users/user");
const { sample } = require("./controllers/product");
const { initializeS3Bucket } = require("./services/aws/s3");
const { getGetHomePageDetailsByUserId } = require("./services/product/product");
dotenv.config();
const port = process.env.PORT || 5000;

app.listen(port, () => {
    logger.info(`Server is running on Port ${port}`)
    console.log(`Server is running on Port ${port}`,)
});
initializeS3Bucket()

// initialize user privileges - one time use for initializing the db
// initializeUserPrivileges()
// getGetHomePageDetailsByUserId()
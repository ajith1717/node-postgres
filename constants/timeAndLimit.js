


module.exports.EMAIL_VERIFICATION_OTP_EXPIRY_DELAY = 10
module.exports.SMS_VERIFICATION_OTP_EXPIRY_DELAY = 10
module.exports.SMS_VERIFICATION_OTP_EXPIRY_DELAY_SEC = 6000
module.exports.FORGOT_PASSWORD_LINK_EXPIRY_DELAY = 7200 // 2hrs in sec
module.exports.GUARDIAN_INVITATION_LINK_EXPIRY_DELAY = 10080// 7day
module.exports.EMAIL_VERIFICATION_LINK_EXPIRY_DELAY = 10080 // 7day
module.exports.EMAIL_VERIFICATION_LINK_EXPIRY_DELAY_IN_SEC = 604800 // 7day
module.exports.SMS_5_ATTEMPTS_DELAY = 10 //Ideally 1 hour
exports.smsOtpRetryTimeout = 90; // in seconds
exports.otpResendLimitThreshold = 3; // after this limit, link will can only be resend after specific time
exports.smsOtpRetryTimeoutAfterLimitReach = 3600; // in seconds



// JWT TOKEN EXPIRE
exports.JWT_ACCESS_TOKEN_VALIDITY = '31536000s'; // 1 year in sec
exports.ONE_YEAR_IN_SECONDS = '31536000s' //'31536000s'; // 1 year in sec
exports.ONE_WEEK_IN_SECONDS = '604800s'; // 1 week in sec
exports.ONE_DAY_IN_SECONDS = '2630000s'
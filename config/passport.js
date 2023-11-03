const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const { logger, errorLogger } = require("../config/pino-config");
const Users = require("../models/mongodb/Users");
const { HTTP_STATUS_CODE } = require("../constants/general");
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.COMMON_SECRET_KEY;


passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    Users.findOne({ _id: jwt_payload._id }, '_id name email userRole').lean()
      .then((user) => {
        if (user) {
          return done(null, user);
        }
        return done(null, false, { message: 'No user found', status: 404 });
      }).catch(err => {
        console.log('err', err)
        errorLogger.error({ data: { errors: err } }, `Failed to`);
        return done(null, false);
      })
    // .catch((err) => { logger.error({ passport: err }));
  })
);




module.exports.authenticateAPI = async (req, res, next) => {
  // in this sample used jwt strategy, but you can use any

  return await passport.authenticate('jwt', { session: false }, function (err, user, info) {
    // console.log(info)
    if (info && info.name === "TokenExpiredError") {
      // jwt token in expired, send response 
      let responseObj = {
        success: false,
        msg: "Token Expired",
        errors: [{
          type: "",
          message: "Token Expired. Unauthorized",
          code: 401
        }]
      }
      // SECURITY ISSUES FIX SNYK - CWE-79
      // responseObj = generateResponse(responseObj)

      res.status(HTTP_STATUS_CODE.UNAUTHORIZED).json(responseObj);
      return false;

    } else if (info && info.message === "No user found") {
      // user not found 
      // return unauthorized
      let responseObj = {
        success: false,
        msg: "Access denied. You must be logged in to access this. Please log in or create an account to proceed.",
        errors: [{
          type: "",
          message: "Access denied. You must be logged in to access this. Please log in or create an account to proceed.",
          code: 401
        }]
      }
      // SECURITY ISSUES FIX SNYK - CWE-79
      res.status(HTTP_STATUS_CODE.UNAUTHORIZED).json((responseObj));
      return false;
    }

    if (err) {
      errorLogger.error({ data: { error: err } }, `${err.message}`);
      return next(err);
    }

    if (user) {
      req.user = user;
      next();
    } else {
      let responseObj = {
        success: false,
        msg: "Unauthorized",
        errors: [{
          type: "",
          message: "Unauthorized",
          code: 401
        }]
      }
      // SECURITY ISSUES FIX SNYK - CWE-79
      res.status(HTTP_STATUS_CODE.UNAUTHORIZED).json((responseObj));
      return false
    }
  })(req, res, next);
};



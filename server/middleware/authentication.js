const jwt = require("jsonwebtoken");
const db = require("../models");
const keys = require("../config/keys");

exports.checkSession = (req, res, next) => {
  if (req.user) {
    return next();
  }

  return next({
    status: 401,
    message: "Please login first."
  });
};

exports.verifySession = (req, res, next) => {
  //check if request has been sent with existing session
  if (!(req.session && req.session.userToken)) {
    return next({
      status: 403,
      message: "Access denied 0."
    });
  }

  //verify signature
  jwt.verify(
    req.session.userToken,
    keys.JWT_SIGNING_KEY,
    { algorithms: keys.JWT_SIGNING_ALGORITHM },
    function(err, verifiedJwt) {
      if (err) {
        return next({
          status: 403,
          message: "Access denied 1."
        });
      }

      //verify user from request is same as token
      if (req.user && req.user.id == verifiedJwt.sub) {
        return next();
      }

      return next({
        status: 403,
        message: "Access denied 2."
      });
    }
  );
};

exports.createSession = (req, res, user) => {
  //add user_id to token
  let claims = {
    scope: "active",
    sub: user._id
  };

  token = jwt.sign(claims, keys.JWT_SIGNING_KEY, {
    algorithm: keys.JWT_SIGNING_ALGORITHM,
    expiresIn: keys.SESSION_DURATION
  });

  req.session.userToken = token;
};

exports.loadSession = (req, res, next) => {
  //check if request has been sent with existing session
  if (!(req.session && req.session.userToken)) {
    return next();
  }

  //verify signature
  jwt.verify(
    req.session.userToken,
    keys.JWT_SIGNING_KEY,
    { algorithms: keys.JWT_SIGNING_ALGORITHM },
    function(err, verifiedJwt) {
      if (err) {
        return next({
          status: 500,
          message: "Internal error: " + err.message
        });
      }
      //find user from token data and add user data to request
      db.User.findById(verifiedJwt.sub, (err, user) => {
        if (err) {
          return next({
            status: 500,
            message: "Internal error: " + err.message
          });
        }
        if (!user) {
          return next();
        }
        user.password = undefined;
        let { id, username, profileImgUrl } = user;

        req.user = { id, username, profileImgUrl };
        res.locals.user = { id, username, profileImgUrl };
        return next();
      });
    }
  );
};

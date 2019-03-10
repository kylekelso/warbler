const { createSession } = require("../middleware/authentication");
const db = require("../models");
const keys = require("../config/keys");

exports.loginUser = async function(req, res, next) {
  //find user, attempt password verification, and return inital user info
  try {
    let user = await db.User.findOne({
      email: req.body.email
    });

    let isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      let { id, username, profileImgUrl, description } = user;
      createSession(req, res, user);
      return res.status(200).json({
        id,
        username,
        profileImgUrl,
        description
      });
    } else {
      return next({
        status: 400,
        message: "Credentials: Invalid."
      });
    }
  } catch (err) {
    return next({
      status: 400,
      message: "Credentials: Invalid."
    });
  }
};

exports.logoutUser = async function(req, res) {
  req.session.reset();
  return res.status(200).send();
};

exports.registerUser = async function(req, res, next) {
  //create user, create session, and send return inital user info
  try {
    let user = await db.User.create(req.body);
    let { id, username, profileImgUrl, description } = user;
    createSession(req, res, user);
    return res.status(200).json({
      id,
      username,
      profileImgUrl,
      description
    });
  } catch (err) {
    return next({
      status: 400,
      message: err.message
    });
  }
};

exports.getSession = async function(req, res) {
  if (req.user) {
    return res.status(200).json(req.user);
  }
  return res.status(200).send(false);
};

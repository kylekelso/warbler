const express = require("express"),
  router = express.Router();

const {
  loginUser,
  logoutUser,
  registerUser
} = require("../handlers/authentication");

router.get("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/register", registerUser);

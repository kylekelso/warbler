const express = require("express"),
  router = express.Router();

const {
  loginUser,
  logoutUser,
  registerUser,
  getSession
} = require("../handlers/authentication");

router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/register", registerUser);
router.get("/session", getSession);

module.exports = router;

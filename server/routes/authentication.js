const express = require("express"),
  router = express.Router();

const {
  loginUser,
  logoutUser,
  registerUser
} = require("../handlers/authentication");

router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/register", registerUser);

module.exports = router;

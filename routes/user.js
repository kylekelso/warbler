const express = require("express"),
  router = express.Router();

const { getUser, searchUsers, updateUser } = require("../handlers/user");
const {
  checkSessionExists,
  verifySession
} = require("./../middleware/authentication");
/* READ */
/*
 * Index - will retrieve users via search query (pagination)
 * NOTE: Unused at the moment. Will likely be used in future search function.
 */
router.get("/users", searchUsers);
//Show - get specific user
router.get("/:username", getUser);

/* UPDATE */
/*
 * Edit - edit user profile
 * NOTE: Unused at the moment. Future update.
 */
router.put("/:username", checkSessionExists, verifySession, updateUser);

/* DELETE */
/*
 * Delete - delete user profile
 * NOTE: Unused at the moment. Future update.
 */
//router.delete("/:user_id");

module.exports = router;

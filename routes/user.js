const express = require("express"),
  router = express.Router();

const { getUser, searchUsers } = require("../handlers/user");

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
//router.put("/:user_id");

/* DELETE */
/*
 * Delete - delete user profile
 * NOTE: Unused at the moment. Future update.
 */
//router.delete("/:user_id");

module.exports = router;

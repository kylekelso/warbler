const express = require("express"),
  router = express.Router();

const { createPost, getPosts, deletePost } = require("../handlers/post");
const {
  checkSessionExists,
  verifySession
} = require("./../middleware/authentication");
/* CREATE */
router.post("/user/posts", checkSessionExists, verifySession, createPost);

/* READ */
//Index - will get all posts based on query and authorizaton
router.get("/:user_id/posts", getPosts);
/*
 * Show - get specific post
 * NOTE: Unused at the moment. Will likely be used to inspect a post and it's reply chains.
 */
//router.get("/:post_id");

/* UPDATE */
/*
 * Edit - change aspects of specific post
 * NOTE: Unused at the moment. Will likely be used in future edit feature
 */
//router.put("/:post_id");

/* DELETE */
router.delete(
  "/user/posts/:post_id",
  checkSessionExists,
  verifySession,
  deletePost
);

module.exports = router;

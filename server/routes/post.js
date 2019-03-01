const express = require("express"),
  router = express.Router();

const { createPost, getPosts, deletePost } = require("../handlers/post");

/* CREATE */
router.post("/:user_id/posts/", createPost);

/* READ */
//Index - will get all posts based on query and authorizaton
router.get("/:user_id/posts/", getPosts);
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
router.delete("/:user_id/posts/:post_id", deletePost);

module.exports = router;

const express = require("express"),
  router = express.Router();

/* CREATE */
router.post("/");

/* READ */
//Index - will get all posts based on query and authorizaton
router.get("/");
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
router.delete("/:post_id");

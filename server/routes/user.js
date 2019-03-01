const express = require("express"),
  router = express.Router();

/* CREATE */
router.post("/");

/* READ */
/*
 * Index - will retrieve users via search query (pagination)
 * NOTE: Unused at the moment. Will likely be used in future search function.
 */
router.get("/");
//Show - get specific user
router.get("/:user_id");

/* UPDATE */
router.put("/:user_id");

/* DELETE */
router.delete("/:user_id");

const db = require("../models");

exports.createPost = async function(req, res, next) {
  try {
    //find all users that are associated with tags
    let tags = await db.User.find(
      { username: { $in: req.body.tags } },
      { _id: 1 }
    );

    //create the post in database
    let post = await db.Post.create({
      author: req.user.id,
      text: req.body.text,
      tags
    });

    //get the user by id and add it to posts array as ref.
    let user = await db.User.findOne({ _id: req.user.id });
    user.posts.push(post.id);
    await user.save();

    //populate created post and send it back to client
    let populatePost = await db.Post.findById(post.id)
      .populate("author", {
        username: true,
        profileImgUrl: true
      })
      .populate("tags", { username: true });

    return res.status(200).json(populatePost);
  } catch (err) {
    return next({
      status: 400,
      message: err.message
    });
  }
};

exports.getPosts = async function(req, res, next) {
  try {
    //get pagination vars
    var page = Math.max(0, req.query.page - 1) || 0;
    var take = 10;

    /*
     * find all posts by user query, skip to page based on take value, get only certain amount (take),
     * have newest posts first, and make sure to fill author/tags user references.
     */
    console.log(req.params);
    let posts = await db.Post.find({ author: req.params.user_id })
      .skip(page * take)
      .limit(take)
      .sort({ createdAt: "desc" })
      .populate("author", {
        username: true,
        profileImgUrl: true
      })
      .populate("tags", { username: true });

    return res.status(200).json(posts);
  } catch (err) {
    return next({
      status: 400,
      message: err.message
    });
  }
};

//exports.getPost

//exports.editPost

exports.deletePost = async function(req, res, next) {
  try {
    let post = await db.Post.findOne({
      _id: req.params.post_id
    }).populate("author", {
      username: true,
      profileImgUrl: true
    });

    if (post.author.id === req.user.id) {
      await post.remove();
      return res.status(200).send("Success");
    }

    return next({
      status: 401,
      message: "Permission denied."
    });
  } catch (err) {
    return next({
      status: 400,
      message: err.message
    });
  }
};

const db = require("../models");

exports.getUser = async function(req, res, next) {
  try {
    let user = await db.User.findOne({
      username: req.params.username
    });

    if (!user) {
      return res.status(200).json(false);
    }

    let { id, username, profileImgUrl } = user;
    return res.status(200).json({ id, username, profileImgUrl });
  } catch (err) {
    return next({
      status: 400,
      message: err.message
    });
  }
};

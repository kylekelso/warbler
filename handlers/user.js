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

exports.searchUsers = async function(req, res, next) {
  try {
    let results = await db.User.find(
      {
        username: { $regex: req.query.search, $options: "i" }
      },
      { username: 1, profileImgUrl: 1 }
    ).limit(10);

    return res.status(200).json(
      results.reduce((result, { username, profileImgUrl }) => {
        if (username !== req.user.username) {
          result.push({ username, profileImgUrl });
        }
        return result;
      }, [])
    );
  } catch (err) {
    return next({
      status: 400,
      message: err.message
    });
  }
};

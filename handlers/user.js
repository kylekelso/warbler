const { createSession } = require("../middleware/authentication");
const db = require("../models");

exports.getUser = async function(req, res, next) {
  try {
    let user = await db.User.findOne({
      username: req.params.username
    });

    if (!user) {
      return res.status(200).json(false);
    }

    let { id, username, profileImgUrl, description } = user;
    return res.status(200).json({ id, username, profileImgUrl, description });
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

exports.updateUser = async function(req, res, next) {
  try {
    let user = await db.User.findOne({
      username: req.user.username
    });

    //possible changes -
    // Username, profileImgUrl, description
    // privateProfile
    // Password, email

    switch (req.body.updateType) {
      case "profile":
        let { username, profileImgUrl, description } = req.body;

        await db.User.findOneAndUpdate(
          { username: req.user.username },
          {
            $set: {
              username: username,
              profileImgUrl: profileImgUrl,
              description: description
            }
          }
        );
        createSession(req, res, user);
        return res
          .status(200)
          .json({ id: req.user.id, username, profileImgUrl, description });
      case "privacy":
        break;
      case "account":
        break;
      default:
        return next({
          status: 400,
          message: "Unknown update command."
        });
    }
  } catch (err) {
    return next({
      status: 400,
      message: err.message
    });
  }
};

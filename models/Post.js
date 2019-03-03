const mongoose = require("mongoose");
const User = require("./User");

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    text: {
      type: String,
      required: true,
      maxlength: 160
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  {
    timestamps: true
  }
);

postSchema.pre("remove", async function(next) {
  try {
    let user = await User.findOne({ _id: this.author });
    user.posts.remove(this.id);
    await user.save();

    return next();
  } catch (err) {
    return next(err);
  }
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;

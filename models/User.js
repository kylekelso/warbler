const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const keys = require("../config/keys");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unqiue: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profileImgUrl: {
    type: String
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }
  ]
});

//encrypt password before saving to database
userSchema.pre("save", async function(next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    let hashedPwd = await bcrypt.hash(this.password, keys.BCRYPT_WORK_FACTOR);
    this.password = hashedPwd;
    return next();
  } catch (err) {
    return next(err);
  }
});

//public function - tests unecrypted password attempt with the encrypted one in database
userSchema.methods.comparePassword = async function(candidatePwd, next) {
  try {
    let isMatch = await bcrypt.compare(candidatePwd, this.password);
    return isMatch;
  } catch (err) {
    return next(err);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;

const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
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
  description: {
    type: String,
    default: ""
  },
  privateProfile: {
    type: Boolean,
    default: false
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
    let salt = await bcrypt.genSalt();
    let hashedPwd = await bcrypt.hash(this.password, salt);
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

userSchema.plugin(uniqueValidator, { message: "{VALUE} exists." });

const User = mongoose.model("User", userSchema);

module.exports = User;

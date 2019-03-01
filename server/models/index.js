const mongoose = require("mongoose");
const keys = require("../config/keys");

if (process.env.NODE_ENV !== "production") {
  mongoose.set("debug", true);
}
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.Promise = Promise;
mongoose.connect(keys.MONGO_URI, {
  keepAlive: true,
  useNewUrlParser: true
});

module.exports.User = require("./User");
module.exports.Post = require("./Post");

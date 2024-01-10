const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
});

const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel,
};

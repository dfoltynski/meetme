const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Date, required: true },
  profile_pic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userProfilePicture",
  },
  friends: [],
  messages: [],
  pin: {},
  sex: { type: String },
});

const userProfilePictureSchema = new Schema({
  name: String,
  type: String,
  data: Buffer,
});

const User = mongoose.model("user", userSchema);
const userProfilePicture = mongoose.model(
  "userProfilePicture",
  userProfilePictureSchema
);

module.exports = { User, userProfilePicture };

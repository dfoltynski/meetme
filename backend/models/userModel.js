const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
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
    pin: [],
    sex: { type: String },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const userProfilePictureSchema = new Schema(
  {
    name: String,
    type: String,
    data: Buffer,
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const socketUsersSchema = new Schema({
  email: { type: String, required: true },
  id: { type: String, required: true },
});

const User = mongoose.model("user", userSchema);
const userProfilePicture = mongoose.model(
  "userProfilePicture",
  userProfilePictureSchema
);
const socketUsers = mongoose.model("socketUser", socketUsersSchema);

module.exports = { User, userProfilePicture, socketUsers };

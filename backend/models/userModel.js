const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    profile_pic: { name: String, type: String, data: Buffer, required: true },
    friends: [],
    pin: {},
    sex: { type: String },
    relationship_status: { type: String },
});

const User = mongoose.model("user", userSchema);

module.exports = User;

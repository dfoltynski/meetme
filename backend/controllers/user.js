require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.getUser = async (req, res) => {
  const user = await User.find();
  res.json(user);
};

exports.getSpecificUser = async (req, res) => {
  try {
    const user = await User.findOne({ name: req.params.name });
    if (user) {
      const payload = {
        id: user._id,
        name: user.name,
      };
      const token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: "1m",
      });
      console.log(token);
      res.header("Bearer-Authorization", token).send(user);
    } else {
      throw new Error("user is not in database");
    }
  } catch (error) {
    console.log(error);
    res.json("user is not in database");
  }
};

exports.postUser = async (req, res) => {
  const user = new User({ name: req.body.name });
  user.save();
  res.json("user added");
};

exports.secretInfo = (req, res) => {
  res.json("secret");
};

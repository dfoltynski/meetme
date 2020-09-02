require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Joi = require("joi");

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

const validationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  name: Joi.string().min(2).required(),
  last_name: Joi.string().required(),
  age: Joi.number().required().min(18),
  profile_pic: Joi.string(),
  sex: Joi.string().required(),
  relationship_status: Joi.string(),
});

exports.postUser = async (req, res) => {
  const {
    email,
    password,
    name,
    last_name,
    age,
    profile_pic,
    sex,
    relationship_status,
  } = req.body;

  try {
    const validatedData = await validationSchema.validateAsync({
      email,
      password,
      name,
      last_name,
      age,
      profile_pic,
      sex,
      relationship_status,
    });

    console.log(validatedData);

    const user = new User({
      email,
      password,
      name,
      last_name,
      age,
      profile_pic,
      sex,
      relationship_status,
    });
    user.save();
    res.json("user added");
  } catch (error) {
    console.log(error);
    const errorMessage = error.details
      ? error.details[0].message
      : "Something went wrong";
    res.json(errorMessage);
  }
};

exports.secretInfo = (req, res) => {
  res.json("secret");
};

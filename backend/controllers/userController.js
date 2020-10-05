require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User, userProfilePicture } = require("../models/userModel");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const multer = require("multer");
const fs = require("fs");

const salt = 10;

const generateToken = (user) => {
  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
  };
  const token = jwt.sign(payload, process.env.SECRET, {
    expiresIn: "30m",
  });

  return token;
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    if (await bcrypt.compare(password, user.password)) {
      const token = generateToken(user);

      res.header("Bearer-Authorization", token);
      const profile_pic = await userProfilePicture.findById(user.profile_pic);
      res.status(200).json({
        message: "zalogowan",
        token,
        name: user.name,
        profile_pic: profile_pic.data,
        user_id: user._id,
      });
    } else {
      res.status(401).json("incorrect email or password");
    }
  } else {
    res.status(401).json("there is no such a user in database");
  }
};

exports.getUser = async (req, res) => {
  const user = await User.find();
  res.json(user);
};

const loginValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  name: Joi.string().min(2).required(),
});

exports.getSpecificUser = async (req, res) => {
  try {
    const validatedData = await loginValidationSchema.validateAsync(
      ({ email, password, name } = req.body)
    );

    const user = await User.findOne({ name: req.params.name });
    if (user) {
      res.json(user);
    } else {
      throw new Error("user is not in database");
    }
  } catch (error) {
    console.log(error);
    const errorMessage = error.details
      ? error.details[0].message
      : "Something went wrong";
    res.json(errorMessage);
  }
};

const registerValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  name: Joi.string().min(2).required(),
  sex: Joi.string().required(),
});

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

let upload = multer({ storage }).single("file");

exports.postUser = (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err);
      } else if (err) {
        return res.status(500).json(err);
      }

      let imageData = fs.readFileSync(req.file.path);

      const validatedData = await registerValidationSchema.validateAsync({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        sex: req.body.sex,
      });

      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const { email, name, sex } = validatedData;

      const userPic = new userProfilePicture({
        name: req.file.originalname,
        type: req.file.mimetype,
        data: imageData,
      });

      const user = new User({
        email,
        password: hashedPassword,
        name,
        age: req.body.age,
        profile_pic: userPic._id,
        friends: ["dawid@dawid.com", "dawid2@dawid.com"],
        sex,
      });

      userPic.save();
      user.save();
      res.json("user added");
    });
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

require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
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
    };
    const token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: "1m",
    });

    return token;
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (await bcrypt.compare(password, user.password)) {
        const token = generateToken(user);
        console.log(token);
        res.header("Bearer-Authorization", token);
        res.json({ message: "zalogowan", token });
    }

    res.json("login");
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
    age: Joi.number().required().min(18),
    sex: Joi.string().required(),
    relationship_status: Joi.string(),
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
            console.log(imageData);
            console.log(req.body.data);

            // i done it that way cus email is not defined'
            // const validatedData = await registerValidationSchema.validateAsync({
            //     email: req.body.email,
            //     password: req.body.password,
            //     name: req.body.name,
            //     age: req.body.age,
            //     sex: req.body.sex,
            //     relationship_status: req.body.relationship_status,
            // });

            // const hashedPassword = await bcrypt.hash(req.body.password, salt);

            // const {
            //     email,
            //     name,
            //     age,
            //     sex,
            //     relationship_status,
            // } = validatedData;

            // const user = new User({
            //     email,
            //     password: hashedPassword,
            //     name,
            //     age,
            //     profile_pic,
            //     sex,
            //     relationship_status,
            // });

            // user.save();
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

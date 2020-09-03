require("dotenv").config();
const jwt = require("jsonwebtoken");
const router = require("express").Router();

const {
  getUser,
  getSpecificUser,
  postUser,
  secretInfo,
  loginUser,
} = require("./controllers/userController");

const verify = (req, res, next) => {
  const token = req.header("Bearer-Authorization");
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, validToken) => {
      if (err) console.log(err);

      if (validToken) {
        console.log(token);
        next();
      } else {
        res.sendStatus(403);
      }
    });
  } else {
    res.send("token is required");
  }
};

router.get("/", (req, res) => {
  res.json("root route");
});

router.get("/users/", getUser);
router.get("/users/:name", getSpecificUser);

router.get("/secret/", secretInfo);

router.get("/auth-me/", verify, (req, res) => {
  res.sendStatus(200);
});

router.post("/users/", postUser);
router.post("/users/login", loginUser);

module.exports = router;

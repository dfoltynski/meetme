require("dotenv").config();
const jwt = require("jsonwebtoken");
const router = require("express").Router();

const {
    getUser,
    getSpecificUser,
    postUser,
    secretInfo,
    addFriend,
    loginUser,
} = require("./controllers/userController");
const { addMarker, getMarker } = require("./controllers/mapController");
const { getFriendList } = require("./controllers/friendController");

const verify = (req, res, next) => {
    const token = req.header("Bearer-Authorization");
    if (token) {
        jwt.verify(token, process.env.SECRET, (err, validToken) => {
            if (err) console.log(err);

            if (validToken) {
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
router.post("/add-friend/", addFriend);
router.post("/users/login", loginUser);
router.post("/markers", addMarker);
router.get("/markers", getMarker);

router.get("/friends/", getFriendList);

module.exports = router;

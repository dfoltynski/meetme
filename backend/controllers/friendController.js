const jwt = require("jsonwebtoken");
const { User, userProfilePicture } = require("../models/userModel");

exports.getFriendList = async (req, res) => {
    const token = req.header("Bearer-Authorization");
    const payload = jwt.decode(token);
    const user = await User.findOne({ email: payload.email });
    const friendDetails = new Map();
    await Promise.all(
        user.friends.map(async (friend) => {
            let friendHolder = await User.findOne({ email: friend });
            let friendPictureHolder = await userProfilePicture.findById(
                friendHolder.profile_pic
            );
            friendDetails.set(friend, {
                name: friendHolder.name,
                picture: friendPictureHolder.data,
            });
        })
    );

    let friendObject = Array.from(friendDetails).reduce(
        (friendObject, [key, value]) => {
            friendObject[key] = value;
            return friendObject;
        },
        {}
    );

    res.status(200).json(friendObject);
};

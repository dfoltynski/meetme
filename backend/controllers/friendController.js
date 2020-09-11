const jwt = require("jsonwebtoken");
const { User, userProfilePicture } = require("../models/userModel");

exports.getFriendList = async (req, res) => {
  const token = req.header("Bearer-Authorization");
  const payload = jwt.decode(token);
  const user = await User.findOne({ email: payload.email });
  const friendDetails = new Map();
  user.friends.forEach(async (friend) => {
    let friendHolder = await User.findOne({ email: friend });
    let friendPictureHolder = await userProfilePicture.findById(
      friendHolder.profile_pic
    );
    friendDetails.set(friend, {
      name: friendHolder.name,
      picture: friendPictureHolder.data,
    });
  });
  console.log(friendDetails);

  res.status(200).json(friendDetails);
};

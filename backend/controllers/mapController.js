const { Marker } = require("../models/markerModel");
const { User } = require("../models/userModel");

exports.addMarker = async (req, res) => {
  const { lng, lat, message, user_id } = req.body;
  const marker = new Marker({ lng, lat, message, user_id });

  marker.save();
  res.json("marker added");
};

exports.getMarker = async (req, res) => {
  const markers = await Marker.find();
  const user = new Map();
  await Promise.all(
    markers.map(async (marker) => {
      user.set(marker._id, marker.user_id);
    })
  );

  let users_id = Array.from(user).reduce((users_id, [key, value]) => {
    users_id[key] = value;
    return users_id;
  }, {});

  res.json({ markers, users_id });
};

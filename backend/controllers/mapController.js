const { Marker } = require("../models/markerModel");
const { User, userProfilePicture } = require("../models/userModel");

exports.addMarker = async (req, res) => {
    const { lng, lat, message, user_id } = req.body;
    const marker = new Marker({
        lng,
        lat,
        message,
        user_id,
    });
    marker.save();
    res.json("marker added");
};

exports.getMarker = async (req, res) => {
    const markers = await Marker.find();
    const markerMap = new Map();
    await Promise.all(
        markers.map(async (marker) => {
            const user = await User.findById(marker.user_id);
            const userProfilePic = await userProfilePicture.findById(
                user.profile_pic
            );
            markerMap.set(marker._id, {
                id: marker._id,
                latitude: marker.lat,
                longitude: marker.lng,
                message: marker.message,
                username: user.name,
                email: user.email,
                profile_pic: userProfilePic.data,
            });
        })
    );

    let markersObject = Array.from(markerMap).reduce(
        (markersObject, [key, value]) => {
            markersObject[key] = value;
            return markersObject;
        },
        {}
    );

    res.status(200).json(markersObject);
};

import React, { useState, useEffect } from "react";

const SpecificMarker = ({ username, email, message, userProfilePicture }) => {
    // useEffect(() => {
    //     console.log(username, message, userProfilePicture, email);
    // });

    return (
        <div
            style={{
                width: "150px",
                height: "150px",
                backgroundColor: "#fff",
                borderRadius: "10px",
                boxShadow: "0px 0px 29px -13px rgba(0, 0, 0, 0.51)",
            }}
        >
            <img
                className="user_profile_pic"
                src={`data:image/jpeg;base64,${userProfilePicture}`}
            ></img>
            {username}
            {message}
        </div>
    );
};

export default SpecificMarker;

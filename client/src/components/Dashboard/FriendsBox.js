import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChatUser } from "../../actions";
import {
    DashboardSection,
    FriendProfilePicture,
    SpecificFriendLabel,
} from "../styledcomponents";

const FriendsBox = ({ friends }) => {
    const dispatch = useDispatch();

    const startChat = (e) => {
        dispatch(setChatUser(e.target.value));
    };

    return (
        <DashboardSection>
            <h1>Friends</h1>
            {friends.map((friend) => (
                <SpecificFriendLabel
                    value={friend.email}
                    onClick={startChat}
                    value={friend.email}
                    key={friend.email}
                >
                    <FriendProfilePicture
                        src={`data:image/jpeg;base64,${friend.img}`}
                    ></FriendProfilePicture>
                    <p style={{ marginLeft: "0.3em" }}>{friend.name}</p>
                </SpecificFriendLabel>
            ))}
        </DashboardSection>
    );
};

export default FriendsBox;

import React, { useState, useRef } from "react";
import {
    DashboardSection,
    FriendProfilePicture,
    SpecificFriendLabel,
} from "../styledcomponents";

const FriendsBox = ({ friends }) => {
    const [chatUser, setChatUser] = useState("Select a friend to talk to...");
    const chatRef = useRef();

    const startChat = (e) => {
        console.log(e.target.value);
        setChatUser(e.target.value);
        if (chatUser === e.target.value) {
            chatRef.current.classList.toggle("toggle__chat");
        }
    };

    return (
        <DashboardSection>
            <h1>Friends</h1>
            {friends.map((friend) => (
                <SpecificFriendLabel
                    value={friend.email}
                    onClick={startChat}
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

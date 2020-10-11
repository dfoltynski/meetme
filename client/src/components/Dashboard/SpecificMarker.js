import React, { useState, memo } from "react";
import { setSpecificMarker } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setChatUser, setChatUsername, setFriendPicture } from "../../actions";
import {
    PopupForm,
    Username,
    MeetInfoBox,
    SubmitMeet,
} from "../styledcomponents";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import io from "socket.io-client";

const socket = io("http://localhost:8080");
const SpecificMarker = ({
    friendExist,
    username,
    email,
    message,
    userProfilePicture,
}) => {
    const dispatch = useDispatch();

    const userEmail = useSelector((state) => state.userEmail);

    const closePopup = () => {
        dispatch(setSpecificMarker(false));
    };

    const addFriend = () => {
        axios.post("http://localhost:8080/v1/add-friend/", {
            userEmail,
            email,
        });

        socket.emit("add friend", userProfilePicture, username, email);
        dispatch(setSpecificMarker(false));
    };

    const sendMessage = (e) => {
        e.preventDefault();
        dispatch(setChatUsername(e.target.childNodes[1].childNodes[1].value));
        dispatch(setChatUser(e.target.childNodes[1].childNodes[0].alt));
        dispatch(setFriendPicture(e.target.childNodes[1].childNodes[0].src));
        dispatch(setSpecificMarker(false));
    };

    return (
        <PopupForm onSubmit={sendMessage}>
            <div
                onClick={closePopup}
                style={{
                    position: "absolute",
                    right: "1em",
                    cursor: "pointer",
                }}
            >
                X
            </div>
            <div className="meeter__info">
                <img
                    className="user_profile_pic"
                    src={`data:image/jpeg;base64,${userProfilePicture}`}
                    alt={email}
                ></img>
                <Username disabled type="text" value={username} />
                {friendExist[email] ? (
                    <FontAwesomeIcon
                        icon={faUserPlus}
                        style={{
                            color: "875ae5",
                            height: "25px",
                            margin: "0 1em",
                            cursor: "pointer",
                        }}
                        onClick={addFriend}
                    ></FontAwesomeIcon>
                ) : null}
            </div>

            <MeetInfoBox type="text" value={message} disabled />
            <SubmitMeet type="submit" value="Send message" />
        </PopupForm>
    );
};

export default memo(SpecificMarker);

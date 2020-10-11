import React, { useState, useEffect } from "react";
import { setSpecificMarker } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import {
    PopupForm,
    Username,
    MeetInfoBox,
    SubmitMeet,
} from "../styledcomponents";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

const SpecificMarker = ({
    id,
    username,
    email,
    message,
    userProfilePicture,
}) => {
    const [addFriendColor, setAddFriendColor] = useState("#875ae5");
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
        setAddFriendColor("#bdbdbd");
    };

    const sendMessage = (e) => {
        e.preventDefault();
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
                ></img>
                <Username disabled type="text" value={username} />
                <FontAwesomeIcon
                    icon={faUserPlus}
                    style={{
                        color: `${addFriendColor}`,
                        height: "25px",
                        margin: "0 1em",
                        cursor: "pointer",
                    }}
                    onClick={addFriend}
                ></FontAwesomeIcon>
            </div>

            <MeetInfoBox type="text" value={message} disabled />
            <SubmitMeet type="submit" value="Send message" />
        </PopupForm>
    );
};

export default SpecificMarker;

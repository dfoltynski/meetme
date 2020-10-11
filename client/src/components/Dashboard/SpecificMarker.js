import React, { useState, useEffect } from "react";
import { setSpecificMarker } from "../../actions";
import { useDispatch } from "react-redux";

import {
    PopupForm,
    Username,
    MeetInfoBox,
    SubmitMeet,
} from "../styledcomponents";

const SpecificMarker = ({ username, email, message, userProfilePicture }) => {
    const dispatch = useDispatch();

    const closePopup = () => {
        dispatch(setSpecificMarker(false));
    };

    return (
        <PopupForm>
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
                <div>[add]</div>
            </div>

            <MeetInfoBox type="text" value={message} disabled />
            <SubmitMeet type="submit" value="Send message" />
        </PopupForm>
    );
};

export default SpecificMarker;

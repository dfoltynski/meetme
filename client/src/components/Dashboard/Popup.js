import React, { useState, useEffect } from "react";
import {
    PopupForm,
    Username,
    MeetInfoBox,
    SubmitMeet,
} from "../styledcomponents";
import { useSelector, useDispatch } from "react-redux";
import { setShowPopup } from "../../actions";

const Popup = () => {
    const [profilePic, setProfilePic] = useState(null);

    const username = useSelector((state) => state.userName);
    const dispatch = useDispatch();

    const closePopup = () => {
        dispatch(setShowPopup(false));
    };

    const submitPopup = () => {
        console.log(
            "post form data to database, and emit it from socket to make it realtime"
        );
        closePopup();
    };

    useEffect(() => {
        setProfilePic(localStorage.getItem("profile_pic"));
    }, []);

    return (
        <PopupForm onSubmit={submitPopup}>
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
                    src={`data:image/jpeg;base64,${profilePic}`}
                ></img>
                <Username disabled type="text" value={username} />
            </div>
            <MeetInfoBox
                type="text"
                placeholder="Write why you want to meet..."
            />
            <SubmitMeet type="submit" value="Publish meet" />
        </PopupForm>
    );
};

export default Popup;

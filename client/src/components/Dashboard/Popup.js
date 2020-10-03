import React from "react";
import {
    PopupForm,
    Username,
    MeetInfoBox,
    SubmitMeet,
} from "../styledcomponents";
import { useSelector, useDispatch } from "react-redux";
import { setShowPopup } from "../../actions";

const Popup = () => {
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
            <div style={{ display: "block" }}>
                <Username disabled type="text" value={username} />
            </div>
            <MeetInfoBox
                type="text"
                placeholder="Write why you want to meet..."
            />
            <div style={{ display: "block" }}>
                <SubmitMeet type="submit" value="Send meet" />
            </div>
        </PopupForm>
    );
};

export default Popup;

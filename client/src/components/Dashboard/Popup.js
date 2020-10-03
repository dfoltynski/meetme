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
            <div style={{ display: "block" }}>
                <Username disabled type="text" value={username} />
            </div>
            <MeetInfoBox
                type="text"
                placeholder="Write why you want to meet..."
            />
            <div style={{ display: "block" }}>
                <SubmitMeet value="Send meet" />
            </div>
        </PopupForm>
    );
};

export default Popup;

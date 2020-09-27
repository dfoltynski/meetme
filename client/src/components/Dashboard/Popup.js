import React from "react";
import { PopupForm } from "../styledcomponents";

const Popup = (user) => {
    return (
        <PopupForm>
            <input disabled type="text"></input>
            <textarea
                type="text"
                placeholder="Write why you want to meet..."
            ></textarea>
        </PopupForm>
    );
};

export default Popup;

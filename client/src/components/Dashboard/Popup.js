import React from "react";
import { PopupForm } from "../styledcomponents";
import { useSelector } from "react-redux";

const Popup = () => {
  const username = useSelector((state) => state.userName);

  return (
    <PopupForm>
      <input disabled type="text" value={username}></input>
      <textarea
        type="text"
        placeholder="Write why you want to meet..."
      ></textarea>
    </PopupForm>
  );
};

export default Popup;

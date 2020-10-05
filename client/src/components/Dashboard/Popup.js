import React, { useState, useEffect, useRef } from "react";
import {
  PopupForm,
  Username,
  MeetInfoBox,
  SubmitMeet,
} from "../styledcomponents";
import { useSelector, useDispatch } from "react-redux";
import { setShowPopup } from "../../actions";
import axios from "axios";

const Popup = ({ user_id, lngLat }) => {
  const [profilePic, setProfilePic] = useState(null);
  const message = useRef();
  const username = useSelector((state) => state.userName);
  const dispatch = useDispatch();

  const closePopup = () => {
    dispatch(setShowPopup(false));
  };

  const submitPopup = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/v1/markers", {
      user_id,
      lng: lngLat.longitude,
      lat: lngLat.latitude,
      message: message.current.value,
    });
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
        ref={message}
        placeholder="Write why you want to meet..."
      />
      <SubmitMeet type="submit" value="Publish meet" />
    </PopupForm>
  );
};

export default Popup;

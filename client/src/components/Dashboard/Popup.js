import React from "react";
import {
  PopupForm,
  Username,
  MeetInfoBox,
  SubmitMeet,
} from "../styledcomponents";
import { useSelector } from "react-redux";

const Popup = () => {
  const username = useSelector((state) => state.userName);

  // const createImagePreview = (bufferArray) => {
  //   Object.entries(bufferArray).map((friend) => {
  //     let imgBinary = Array.prototype.map
  //       .call(friend[1].picture.data, (ch) => {
  //         return String.fromCharCode(ch);
  //       })
  //       .join("");
  //     setFriends((oldFriends) => [
  //       ...oldFriends,
  //       {
  //         name: friend[1].name,
  //         email: friend[0],
  //         img: btoa(imgBinary),
  //       },
  //     ]);
  //   });
  // };

  return (
    <PopupForm>
      <div style={{ display: "block" }}>
        <Username disabled type="text" value={username} />
      </div>
      <MeetInfoBox type="text" placeholder="Write why you want to meet..." />
      <div style={{ display: "block" }}>
        <SubmitMeet value="Send meet" />
      </div>
    </PopupForm>
  );
};

export default Popup;

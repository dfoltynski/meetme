import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import io from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaAngleRight } from "@fortawesome/free-solid-svg-icons";
import "../../App.css";
import FriendsBox from "./FriendsBox";
import MessageBox from "./MessageBox";

import {
  Wrapper,
  DashboardSection,
  Form,
  MessageContainer,
  FriendProfilePicture,
  FriendProfilePictureContainer,
} from "../styledcomponents";

const socket = io("http://localhost:8080");

const Dashboard = () => {
  const [cookie, removeCookie] = useCookies();
  const [friends, setFriends] = useState([]);

  const createImagePreview = (bufferArray) => {
    Object.entries(bufferArray).map((friend) => {
      let imgBinary = Array.prototype.map
        .call(friend[1].picture.data, (ch) => {
          return String.fromCharCode(ch);
        })
        .join("");
      setFriends((oldFriends) => [
        ...oldFriends,
        {
          name: friend[1].name,
          email: friend[0],
          img: btoa(imgBinary),
        },
      ]);
    });
  };

  //   socket.on("send message", (sender, message, friend) => {
  //     if (message) {
  //       console.log(`${sender}: ${message}`);
  //       console.log(`received ${friend}: ${message}`);
  //       setMessages([...messages, { type: "received_message", message }]);
  //       // messageFieldRef.current.scrollTop = messageFieldRef.current.scrollHeight;
  //     }
  //   });

  useEffect(() => {
    socket.emit("add user", cookie.email);

    const auth = async () => {
      try {
        let res = await axios.get("http://localhost:8080/v1/auth-me/", {
          headers: {
            "Bearer-Authorization": cookie.token,
          },
        });
        // console.log(res);
        let friendsRes = await axios.get("http://localhost:8080/v1/friends/", {
          headers: {
            "Bearer-Authorization": cookie.token,
          },
        });
        createImagePreview(friendsRes.data);
      } catch (err) {
        removeCookie("token");
        removeCookie("io");
        removeCookie("email");
        window.location = "/login";
      }
    };
    auth();
  }, []);

  return (
    <Wrapper>
      <FriendsBox friends={friends}></FriendsBox>
      <MessageBox></MessageBox>
    </Wrapper>
  );
};

export default Dashboard;

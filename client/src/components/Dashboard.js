import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import io from "socket.io-client";
import jwt from "jsonwebtoken";
import "../App.css";

import {
  Wrapper,
  DashboardSection,
  Form,
  Input,
  FormContainer,
} from "./styledcomponents";

// TODO: display friends, click on one of them and start real-time conversation

const socket = io("http://localhost:8080");

const Dashboard = () => {
  const [cookie, removeCookie] = useCookies(["token"]);
  const [friends, setFriends] = useState([]);
  const [chatUser, setChatUser] = useState("");
  const chatRef = useRef();
  const message = useRef();

  const startChat = (e) => {
    setChatUser(e.target.value);
    if (chatUser == e.target.value) {
      chatRef.current.classList.toggle("toggle__chat");
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("start chat", message.current.value, chatUser);
    socket.on("start chat", (message, friend) => {
      console.log(`${friend}: ${message}`);
    });
    message.current.value = "";
  };

  useEffect(() => {
    socket.emit("add user", cookie.email, cookie.io);
    const auth = async () => {
      try {
        let res = await axios.get("http://localhost:8080/v1/auth-me/", {
          headers: {
            "Bearer-Authorization": cookie.token,
          },
        });
        console.log(res);
        let friendsRes = await axios.get("http://localhost:8080/v1/friends/", {
          headers: {
            "Bearer-Authorization": cookie.token,
          },
        });
        setFriends(friendsRes.data);
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
      <DashboardSection>
        <h1>Friends</h1>
        {friends.map((friend) => (
          <div>
            <button onClick={(e) => startChat(e)} value={friend}>
              {friend}
            </button>
          </div>
        ))}
      </DashboardSection>
      <FormContainer ref={chatRef} className="toggle__chat">
        <h1>Chat with {chatUser}</h1>
        <Form
          style={{ position: "relative", display: "block", minHeight: "45em" }}
          onSubmit={sendMessage}
        >
          <div style={{ position: "absolute", top: "95%" }}>
            <input name="message" type="text" ref={message} />
            <input type="submit" value="send" />
          </div>
        </Form>
      </FormContainer>
    </Wrapper>
  );
};

export default Dashboard;

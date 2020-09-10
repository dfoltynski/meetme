import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import io from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaAngleRight } from "@fortawesome/free-solid-svg-icons";
import "../App.css";

import {
  Wrapper,
  DashboardSection,
  Form,
  MessageContainer,
} from "./styledcomponents";

const socket = io("http://localhost:8080");

const Dashboard = () => {
  const [cookie, removeCookie] = useCookies();
  const [friends, setFriends] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chatUser, setChatUser] = useState("Select a friend to talk to...");
  const chatRef = useRef();
  const messageRef = useRef();

  const startChat = (e) => {
    setChatUser(e.target.value);
    if (chatUser == e.target.value) {
      chatRef.current.classList.toggle("toggle__chat");
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const sender = cookie.email;
    socket.emit("start chat", messageRef.current.value, chatUser, sender);

    setMessages([
      ...messages,
      { type: "my_message", message: messageRef.current.value },
    ]);
    console.log(`my messages ${messageRef.current.value}`);
    messageRef.current.value = "";
    messageRef.current.focus();
  };

  socket.on("send message", (sender, message, friend) => {
    console.log(`${sender}: ${message}`);
    console.log(`received ${friend}: ${message}`);
    setMessages([...messages, { type: "received_message", message }]);
  });

  useEffect(() => {
    socket.emit("add user", cookie.email);
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
      <div className="toggle__chat" ref={chatRef}>
        <div className="message__conteiner">
          <div className="message__topbar">
            <div className="message__user">{chatUser}</div>
          </div>
          <div>
            <div className="message__field">
              {messages.map((message) =>
                message.type === "my_message" ? (
                  <div className="my_message">{message.message}</div>
                ) : (
                  <div className="received_message">{message.message}</div>
                )
              )}
            </div>
            <div className="message__send__field">
              <form onSubmit={sendMessage}>
                <input
                  type="text"
                  autoComplete="off"
                  name="message"
                  placeholder="Type here..."
                  ref={messageRef}
                />

                <input name="send" type="submit" value=">" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Dashboard;

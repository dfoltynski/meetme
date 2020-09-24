import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import io from "socket.io-client";

const socket = io("http://localhost:8080");
const MessageBox = ({ friend }) => {
  const [cookie, removeCookie] = useCookies();

  const chatUser = useSelector((state) => state.setChatUser);
  const chatRef = useRef();

  const [messages, setMessages] = useState([]);
  const messageRef = useRef();
  const messageFieldRef = useRef();

  socket.on("send message", (sender, message, friend) => {
    if (message) {
      console.log(`${sender}: ${message}`);
      console.log(`received ${friend}: ${message}`);
      setMessages([...messages, { type: "received_message", message }]);
      // messageFieldRef.current.scrollTop = messageFieldRef.current.scrollHeight;
    }
  });

  const sendMessage = (e) => {
    e.preventDefault();
    const sender = cookie.email;
    // socket.emit("start chat", messageRef.current.value, chatUser, sender);
    if (messageRef.current.value) {
      setMessages([
        ...messages,
        { type: "my_message", message: messageRef.current.value },
      ]);
      console.log(`my messages ${messageRef.current.value}`);
      messageRef.current.value = "";
      messageRef.current.focus();
    }
    // messageFieldRef.current.scrollTop = messageFieldRef.current.scrollHeight;
  };

  useEffect(() => {
    console.log(chatUser);
    if (chatUser) {
      chatRef.current.classList.toggle("toggle__chat");
    }
  }, [chatUser]);

  return (
    <div className="toggle__chat" ref={chatRef}>
      <div className="message__conteiner">
        <div className="message__topbar">
          <div className="message__user">{chatUser}</div>
        </div>
        <div>
          <div className="message__field" ref={messageFieldRef}>
            {messages.map((message) =>
              message.type === "my_message" ? (
                <div className="my_message" key={message.message}>
                  {message.message}
                </div>
              ) : (
                <div className="received_message" key={message.message}>
                  {message.message}
                </div>
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
  );
};

export default MessageBox;

import React, { useState, useRef, useEffect, memo } from "react";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import io from "socket.io-client";

const socket = io("http://localhost:8080");
const MessageBox = () => {
    const [cookie, removeCookie] = useCookies();

    const chatUser = useSelector((state) => state.chatUser);
    const chatUsername = useSelector((state) => state.chatUsername);
    const friendPicture = useSelector((state) => state.friendPicture);
    const chatRef = useRef();

    const [messages, setMessages] = useState([]);
    const messageRef = useRef();
    const messageFieldRef = useRef();

    const sendMessage = (e) => {
        e.preventDefault();
        const sender = cookie.email;
        socket.emit("start chat", messageRef.current.value, chatUser, sender);
        if (messageRef.current.value) {
            setMessages([
                ...messages,
                {
                    type: "my_message",
                    message: messageRef.current.value,
                    friend: chatUser,
                },
            ]);

            messageRef.current.value = "";
            messageRef.current.focus();
        }
        // messageFieldRef.current.scrollTop = messageFieldRef.current.scrollHeight;
    };

    socket.on("send message", (sender, message, friend) => {
        if (message) {
            setMessages([
                ...messages,
                { type: "received_message", message, friend: sender },
            ]);
        }
    });

    useEffect(() => {
        socket.emit("add user", cookie.email);
    }, [chatUser]);

    return (
        <div className="toggle__chat" ref={chatRef}>
            <div className="message__container">
                <div className="message__topbar">
                    {friendPicture ? (
                        <div className="message__topbar__friend_info">
                            <img
                                className="message__friend_avatar"
                                alt="friend_avatar"
                                src={friendPicture}
                            ></img>
                        </div>
                    ) : null}
                    <div className="message__user">{chatUsername}</div>
                </div>
                <div>
                    <div className="message__field" ref={messageFieldRef}>
                        {messages.map((message, index) =>
                            message.type === "my_message" ? (
                                chatUser === message.friend ? (
                                    <li className="my_message" key={index}>
                                        {message.message}
                                    </li>
                                ) : null
                            ) : chatUser === message.friend ? (
                                <li className="received_message" key={index}>
                                    {message.message}
                                </li>
                            ) : null
                        )}
                    </div>
                    <div className="message__send__field">
                        {chatUsername !== "Select a friend to talk to..." ? (
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
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(MessageBox);

import React, { useState, useRef, useEffect, memo } from "react";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import io from "socket.io-client";

const socket = io("http://localhost:8080");
const MessageBox = () => {
    const [cookie, removeCookie] = useCookies();

    const chatUser = useSelector((state) => state.chatUser);
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
                { type: "my_message", message: messageRef.current.value },
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
                { type: "received_message", message, friend },
            ]);
        }
    });

    useEffect(() => {
        socket.emit("add user", cookie.email);
    }, [chatUser]);

    return (
        <div className="toggle__chat" ref={chatRef}>
            <div className="message__conteiner">
                <div className="message__topbar">
                    <div className="message__user">{chatUser}</div>
                </div>
                <div>
                    <div className="message__field" ref={messageFieldRef}>
                        {/* {messages.map((message, index) =>
                            message.type === "my_message" ? (
                                <li className="my_message" key={index}>
                                    {message.message}
                                </li>
                            ) : (
                                <li className="received_message" key={index}>
                                    {message.message}
                                </li>
                            )
                        )} */}
                        {messages.map((message, index) => (
                            <li className="received_message" key={index}>
                                {message.message}
                            </li>
                        ))}
                    </div>
                    <div className="message__send__field">
                        {chatUser !== "Select a friend to talk to..." ? (
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

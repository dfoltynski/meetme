import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import io from "socket.io-client";

import { CloseMessageBox } from "../styledcomponents";

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
            // console.log(`my messages ${messageRef.current.value}`);

            messageRef.current.value = "";
            messageRef.current.focus();
        }
        // messageFieldRef.current.scrollTop = messageFieldRef.current.scrollHeight;
    };

    socket.on("send message", (sender, message, friend) => {
        if (message) {
            // console.log(`${sender}: ${message}`);
            // console.log(`received ${friend}: ${message}`);
            setMessages([
                ...messages,
                { type: "received_message", message, friend },
            ]);
        }
    });

    useEffect(() => {
        socket.emit("add user", cookie.email);

        // console.log(chatUser);
        // if (chatUser) {
        //     chatRef.current.classList.toggle("toggle__chat");
        // }

        // setMessages([...messages, { ...fetchedMessage }]);
    }, [chatUser]);

    return (
        <div className="toggle__chat" ref={chatRef}>
            <div className="message__conteiner">
                <div className="message__topbar">
                    <div className="message__user">
                        {chatUser}
                        {/* <CloseMessageBox
                            onClick={() =>
                                chatRef.current.classList.toggle("toggle__chat")
                            }
                        >
                            X
                        </CloseMessageBox> */}
                    </div>
                </div>
                <div>
                    <div className="message__field" ref={messageFieldRef}>
                        {messages.map((message, index) =>
                            message.type === "my_message" ? (
                                <div className="my_message" key={index}>
                                    {message.message}
                                </div>
                            ) : (
                                <div className="received_message" key={index}>
                                    {message.message}
                                </div>
                            )
                        )}
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

export default MessageBox;

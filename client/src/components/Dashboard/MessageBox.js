import React, { useState, useRef } from "react";
import { useCookies } from "react-cookie";

const MessageBox = ({ friend, messages }) => {
    const [cookie, removeCookie] = useCookies();
    const [chatUser, setChatUser] = useState("Select a friend to talk to...");
    const chatRef = useRef();

    const messageRef = useRef();
    const messageFieldRef = useRef();

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
                                <div
                                    className="my_message"
                                    key={message.message}
                                >
                                    {message.message}
                                </div>
                            ) : (
                                <div
                                    className="received_message"
                                    key={message.message}
                                >
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

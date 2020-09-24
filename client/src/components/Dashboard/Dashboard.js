import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import "../../App.css";
import FriendsBox from "./FriendsBox";
import MessageBox from "./MessageBox";

import { Wrapper } from "../styledcomponents";

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

    useEffect(() => {
        const auth = async () => {
            try {
                await axios.get("http://localhost:8080/v1/auth-me/", {
                    headers: {
                        "Bearer-Authorization": cookie.token,
                    },
                });
                let friendsRes = await axios.get(
                    "http://localhost:8080/v1/friends/",
                    {
                        headers: {
                            "Bearer-Authorization": cookie.token,
                        },
                    }
                );
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

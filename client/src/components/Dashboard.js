import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

import { Wrapper, DashboardSection, Form, Input } from "./styledcomponents";

// TODO: display friends, click on one of them and start real-time conversation

const Dashboard = () => {
  const [cookie, removeCookie] = useCookies(["token"]);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const auth = async () => {
      try {
        let res = await axios.get("http://localhost:8080/v1/auth-me/", {
          headers: {
            "Bearer-Authorization": cookie.token,
          },
        });
        console.log(res);
        // store email in redux and send it to API
        let friends = await axios.get("http://localhost:8080/v1/friends/", {
          headers: {
            "Bearer-Authorization": cookie.token,
          },
        });
        console.log(friends);
        setFriends(friends);
      } catch (err) {
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
          <div>{friend}</div>
        ))}
      </DashboardSection>
      <DashboardSection>
        <h1>Messages</h1>
      </DashboardSection>
    </Wrapper>
  );
};

export default Dashboard;

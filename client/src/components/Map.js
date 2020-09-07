import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

const Map = () => {
  const [cookie, removeCookie] = useCookies(["token"]);

  useEffect(() => {
    const auth = async () => {
      try {
        let res = await axios.get("http://localhost:8080/v1/auth-me/", {
          headers: {
            "Bearer-Authorization": cookie.token,
          },
        });
        console.log(res);
      } catch (err) {
        window.location = "/login";
      }
    };
    auth();
  }, []);

  return <div>Map</div>;
};

export default Map;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import "../../App.css";
import FriendsBox from "./FriendsBox";
import MessageBox from "./MessageBox";
import Popup from "./Popup";
import ReactMapGL, {
    GeolocateControl,
    NavigationControl,
    Marker,
} from "react-map-gl";
import Geocoder from "react-mapbox-gl-geocoder";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
    const [cookie, removeCookie] = useCookies();
    const [friends, setFriends] = useState([]);
    const [lngLat, setLngLat] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [viewport, setViewport] = useState({
        width: "100vw",
        height: "100vh",
        latitude: 53.0,
        longitude: 9.0,
        zoom: 3,
    });

    const geolocateStyle = {
        position: "absolute",
        top: 0,
        right: 0,
    };

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

    const createPopup = (e) => {
        const [longitude, latitude] = e.lngLat;
        setLngLat({ longitude, latitude });
        setShowPopup(!showPopup);
        console.log(e.center);
        console.log(e);
    };

    return (
        <ReactMapGL
            {...viewport}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
            mapboxApiAccessToken="pk.eyJ1IjoiZHppYWRkYXdpZCIsImEiOiJja2EzMzRzZXMwN2ZoM2ZsOWFhZXdpeGt0In0.sRWxNOOhq4VLBER1For06g"
            onDblClick={(e) => createPopup(e)}
            onLoad={(e) => setIsLoaded(true)}
        >
            {isLoaded ? (
                <div>
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            width: "100vw",
                            display: "flex",
                            justifyContent: "center",
                            zIndex: 1,
                        }}
                    >
                        <Geocoder
                            mapboxApiAccessToken="pk.eyJ1IjoiZHppYWRkYXdpZCIsImEiOiJja2EzMzRzZXMwN2ZoM2ZsOWFhZXdpeGt0In0.sRWxNOOhq4VLBER1For06g"
                            viewport={viewport}
                            hideOnSelect={true}
                            limit={10}
                            onSelected={(viewport) => setViewport(viewport)}
                        />
                    </div>

                    <GeolocateControl
                        positionOptions={{ enableHighAccuracy: true }}
                        trackUserLocation={true}
                        style={geolocateStyle}
                    />
                    <div style={{ position: "absolute", right: 0, top: "3em" }}>
                        <NavigationControl />
                    </div>
                    <FriendsBox friends={friends}></FriendsBox>
                    <MessageBox></MessageBox>
                    {showPopup ? (
                        <Marker
                            latitude={lngLat.latitude}
                            longitude={lngLat.longitude}
                            offsetLeft={-10}
                            offsetTop={-20}
                        >
                            <Popup></Popup>
                            <FontAwesomeIcon
                                icon={faMapMarkerAlt}
                                color="#6400fa"
                                style={{
                                    height: `${4 * viewport.zoom}px`,
                                    width: `${4 * viewport.zoom}px`,
                                }}
                            />
                        </Marker>
                    ) : null}
                </div>
            ) : (
                <h1>Loading</h1>
            )}
        </ReactMapGL>
    );
};

export default Dashboard;

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import "../../App.css";
import FriendsBox from "./FriendsBox";
import MessageBox from "./MessageBox";
import Popup from "./Popup";
import SpecificMarker from "./SpecificMarker";
import ReactMapGL, {
    GeolocateControl,
    NavigationControl,
    Marker,
} from "react-map-gl";
import Geocoder from "react-mapbox-gl-geocoder";
import {
    setUserEmail,
    setUserName,
    setUserToken,
    setShowPopup,
} from "../../actions";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
    const [cookie, removeCookie] = useCookies();
    const [friends, setFriends] = useState([]);
    const [lngLat, setLngLat] = useState({});
    const [markers, setMarkers] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [showSpecificMarker, setShowSpecificMarker] = useState({});
    const [viewport, setViewport] = useState({
        width: "100vw",
        height: "100vh",
        latitude: 53.0,
        longitude: 9.0,
        zoom: 3,
    });

    const dispatch = useDispatch();
    const showPopup = useSelector((state) => state.showPopup);
    const geolocateStyle = {
        position: "absolute",
        top: 0,
        right: 0,
    };
    const reactGeocoder = useRef();

    const auth = async () => {
        try {
            await axios.get("http://localhost:8080/v1/auth-me/", {
                headers: {
                    "Bearer-Authorization": cookie.token,
                },
            });

            getFriends();
            getMarkers();

            dispatch(setUserToken(cookie.token));
            dispatch(setUserEmail(cookie.email));
            dispatch(setUserName(cookie.name));
        } catch (err) {
            removeCookie("token");
            removeCookie("io");
            removeCookie("email");
            removeCookie("name");
            window.location = "/login";
        }
    };

    const createFriendImagePreview = (bufferArray) => {
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

    const createMarkerUserPreview = (bufferArray) => {
        Object.entries(bufferArray).map((marker) => {
            let imgBinary = Array.prototype.map
                .call(marker[1].profile_pic.data, (ch) => {
                    return String.fromCharCode(ch);
                })
                .join("");
            console.log(marker);
            setMarkers((oldMarkers) => [
                ...oldMarkers,
                {
                    id: marker[1].id,
                    latitude: marker[1].latitude,
                    longitude: marker[1].longitude,
                    message: marker[1].message,
                    name: marker[1].username,
                    email: marker[1].email,
                    img: btoa(imgBinary),
                },
            ]);
        });
    };

    const createPopup = (e) => {
        const [longitude, latitude] = e.lngLat;
        setLngLat({ longitude, latitude });
        setShowPopup(!showPopup);
        dispatch(setShowPopup(!showPopup));
    };

    const getMarkers = async () => {
        let markers = await axios.get("http://localhost:8080/v1/markers");
        createMarkerUserPreview(markers.data);
        console.log(markers.data);
    };

    const getFriends = async () => {
        let friendsRes = await axios.get("http://localhost:8080/v1/friends/", {
            headers: {
                "Bearer-Authorization": cookie.token,
            },
        });
        console.log(friendsRes.data);

        createFriendImagePreview(friendsRes.data);
    };

    useEffect(() => {
        auth();
    }, []);

    return (
        <ReactMapGL
            {...viewport}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
            mapboxApiAccessToken="pk.eyJ1IjoiZHppYWRkYXdpZCIsImEiOiJja2EzMzRzZXMwN2ZoM2ZsOWFhZXdpeGt0In0.sRWxNOOhq4VLBER1For06g"
            onDblClick={(e) => createPopup(e)}
            onLoad={(e) => setIsLoaded(true)}
        >
            {isLoaded ? (
                <React.Fragment>
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
                        {markers.map((marker) => console.log(marker))}
                        {markers.map((marker) => (
                            <React.Fragment key={marker.id}>
                                <Marker
                                    latitude={marker.latitude}
                                    longitude={marker.longitude}
                                    offsetLeft={-10}
                                    offsetTop={-20}
                                >
                                    <FontAwesomeIcon
                                        onClick={() =>
                                            setShowSpecificMarker({
                                                [marker.id]: !showSpecificMarker[
                                                    marker.id
                                                ],
                                            })
                                        }
                                        icon={faMapMarkerAlt}
                                        color="#6400fa"
                                        style={{
                                            height: `${4 * viewport.zoom}px`,
                                            width: `${4 * viewport.zoom}px`,
                                        }}
                                    />
                                    {showSpecificMarker[marker.id] ? (
                                        <SpecificMarker
                                            username={marker.name}
                                            email={marker.email}
                                            message={marker.message}
                                            userProfilePicture={marker.img}
                                        />
                                    ) : null}
                                </Marker>
                            </React.Fragment>
                        ))}
                        <Geocoder
                            mapboxApiAccessToken="pk.eyJ1IjoiZHppYWRkYXdpZCIsImEiOiJja2EzMzRzZXMwN2ZoM2ZsOWFhZXdpeGt0In0.sRWxNOOhq4VLBER1For06g"
                            viewport={viewport}
                            hideOnSelect={true}
                            limit={10}
                            onSelected={(viewport) => setViewport(viewport)}
                            ref={reactGeocoder}
                        />
                    </div>

                    <GeolocateControl
                        positionOptions={{ enableHighAccuracy: true }}
                        trackUserLocation={true}
                        style={geolocateStyle}
                    />
                    <div
                        style={{
                            position: "absolute",
                            right: 0,
                            top: "3em",
                        }}
                    >
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
                            <div>
                                <FontAwesomeIcon
                                    icon={faMapMarkerAlt}
                                    color="#6400fa"
                                    style={{
                                        height: `${4 * viewport.zoom}px`,
                                        width: `${4 * viewport.zoom}px`,
                                    }}
                                />
                                <Popup
                                    user_id={cookie.user_id}
                                    lngLat={lngLat}
                                ></Popup>
                            </div>
                        </Marker>
                    ) : null}
                </React.Fragment>
            ) : null}
        </ReactMapGL>
    );
};

export default Dashboard;

import React from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { setChatUser } from "../../actions";
import {
    DashboardSection,
    FriendProfilePicture,
    SpecificFriendLabel,
    LogoutButton,
} from "../styledcomponents";

const FriendsBox = ({ friends }) => {
    const [cookie, removeCookie] = useCookies();
    const dispatch = useDispatch();

    const startChat = (e) => {
        dispatch(setChatUser(e.target.value));
    };

    const Logout = () => {
        removeCookie("token");
        removeCookie("io");
        removeCookie("email");
        window.location = "/login";
    };

    return (
        <DashboardSection>
            <h1>Friends</h1>
            <LogoutButton onClick={Logout}>Log out</LogoutButton>

            {friends.map((friend) => (
                <SpecificFriendLabel
                    value={friend.email}
                    onClick={startChat}
                    value={friend.email}
                    key={friend.email}
                >
                    <FriendProfilePicture
                        src={`data:image/jpeg;base64,${friend.img}`}
                    ></FriendProfilePicture>
                    <p style={{ marginLeft: "0.3em" }}>{friend.name}</p>
                </SpecificFriendLabel>
            ))}
        </DashboardSection>
    );
};

export default FriendsBox;

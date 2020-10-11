import setChatUser from "./setChatUser";
import setUserEmail from "./setUserEmail";
import setUserName from "./setUserName";
import setUserToken from "./setUserToken";
import { combineReducers } from "redux";
import setChatUsername from "./setChatUsername";
import setFriendPicture from "./setFriendPicture";
import setShowPopup from "./setShowPopup";
import setSpecificMarker from "./setSpecificMarker";
import checkIfFriendAlreadyExist from "./checkIfFriendAlreadyExist";

const allReducers = combineReducers({
    chatUser: setChatUser,
    chatUsername: setChatUsername,
    friendPicture: setFriendPicture,
    userEmail: setUserEmail,
    userName: setUserName,
    showPopup: setShowPopup,
    token: setUserToken,
    specificMarker: setSpecificMarker,
    checkIfFriendAlreadyExist,
});

export default allReducers;

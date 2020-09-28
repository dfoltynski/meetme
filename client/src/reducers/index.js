import setChatUser from "./setChatUser";
import setUserEmail from "./setUserEmail";
import setUserName from "./setUserName";
import setUserToken from "./setUserToken";
import { combineReducers } from "redux";
import setChatUsername from "./setChatUsername";

const allReducers = combineReducers({
  chatUser: setChatUser,
  chatUsername: setChatUsername,
  userEmail: setUserEmail,
  userName: setUserName,
  token: setUserToken,
});

export default allReducers;

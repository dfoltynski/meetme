import setChatUser from "./setChatUser";
import { combineReducers } from "redux";

const allReducers = combineReducers({ chatUser: setChatUser });

export default allReducers;

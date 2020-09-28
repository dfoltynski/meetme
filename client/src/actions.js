export const setChatUser = (user) => {
  return {
    type: "SET_CHAT_USER",
    payload: { user },
  };
};

export const setChatUsername = (username) => {
  return {
    type: "SET_CHAT_USERNAME",
    payload: { username },
  };
};

export const setUserEmail = (email) => {
  return { type: "SET_USER_EMAIL", payload: { email } };
};

export const setUserToken = (token) => {
  return { type: "SET_USER_TOKEN", payload: { token } };
};

export const setUserName = (username) => {
  return { type: "SET_USER_NAME", payload: { username } };
};

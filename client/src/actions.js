export const setChatUser = (user) => {
  return {
    type: "SET_CHAT_USER",
    payload: { user },
  };
};

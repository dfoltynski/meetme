const setChatUser = (state = "", action) => {
  switch (action.type) {
    case "SET_CHAT_USER":
      return (state = action.payload.user);

    default:
      return state;
  }
};

export default setChatUser;

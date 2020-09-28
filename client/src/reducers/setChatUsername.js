const setChatUsername = (state = "Select a friend to talk to...", action) => {
  switch (action.type) {
    case "SET_CHAT_USERNAME":
      return (state = action.payload.username);

    default:
      return state;
  }
};

export default setChatUsername;

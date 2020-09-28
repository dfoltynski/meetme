const setUserName = (state = "", action) => {
  switch (action.type) {
    case "SET_USER_NAME":
      return (state = action.payload.username);

    default:
      return state;
  }
};

export default setUserName;

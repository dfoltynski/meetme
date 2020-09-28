const setUserToken = (state = "", action) => {
  switch (action.type) {
    case "SET_USER_TOKEN":
      return (state = action.payload.token);

    default:
      return state;
  }
};

export default setUserToken;

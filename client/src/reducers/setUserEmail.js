const setUserEmail = (state = "", action) => {
  switch (action.type) {
    case "SET_USER_EMAIL":
      return (state = action.payload.email);

    default:
      return state;
  }
};

export default setUserEmail;

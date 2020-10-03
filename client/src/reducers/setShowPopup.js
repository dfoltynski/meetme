const setShowPopup = (state = false, action) => {
    switch (action.type) {
        case "SET_SHOW_POPUP":
            return (state = action.payload.showPopup);

        default:
            return state;
    }
};

export default setShowPopup;

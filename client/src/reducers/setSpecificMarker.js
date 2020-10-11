const setSpecificMarker = (state = {}, action) => {
    switch (action.type) {
        case "SET_SPECIFIC_MARKER":
            return (state = action.payload.specificMarker);

        default:
            return state;
    }
};

export default setSpecificMarker;

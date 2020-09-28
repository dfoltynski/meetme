const setFriendPicture = (state = "", action) => {
    switch (action.type) {
        case "SET_FRIEND_PICTURE":
            return (state = action.payload.friend_avatar);

        default:
            return state;
    }
};

export default setFriendPicture;

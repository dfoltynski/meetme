const checkIfFriendAlreadyExist = (state = [], action) => {
    switch (action.type) {
        case "CHECK_IF_FRIEND_ALREADY_EXIST":
            let emails = new Set(state);
            emails.add(action.payload.friends);
            return (state = [...emails]);

        default:
            return state;
    }
};

export default checkIfFriendAlreadyExist;

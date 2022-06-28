export const getProfile = () => {
    return (dispatch, getState) => {

        dispatch({type: "GET_PROFILE"});

        return getState().user;
    } 
}

export const setName = (newName) => {
    return (dispatch, getState) => {
        dispatch({type: "SET_NAME", payload: newName});
    }
}

export const setAvatar = (avatarID) => {
    return (dispatch, getState) => {
        dispatch({type: "SET_AVATAR", payload: avatarID});
    }
}
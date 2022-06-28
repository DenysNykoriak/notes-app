const SET_NAME = "SET_NAME";
const SET_AVATAR = "SET_AVATAR";
const RESET_AVATAR = "RESET_AVATAR";
const GET_PROFILE = "GET_PROFILE";

const initialState = {
    name: "Unknown",
    avatar: 0
};

if(!localStorage.getItem("user")) localStorage.setItem("user", JSON.stringify(initialState));

export const userReducer = (state = initialState, action) => {
    switch(action.type){
        case(SET_NAME):

            state.name = action.payload;

            localStorage.setItem("user", JSON.stringify(state));
            return state;

        case(SET_AVATAR):

            state.avatar = action.payload;

            localStorage.setItem("user", JSON.stringify(state));
            return state;

        case(RESET_AVATAR):

            state.avatar = 0;

            localStorage.setItem("user", JSON.stringify(state));
            return state;

        case(GET_PROFILE):
            return JSON.parse(localStorage.getItem("user"));
        

        default:
            return state;
    }
}
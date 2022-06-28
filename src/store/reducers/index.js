import { combineReducers } from "redux";
import { noteReducer } from "./noteReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
    note: noteReducer,
    user: userReducer
});
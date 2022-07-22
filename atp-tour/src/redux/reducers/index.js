import { combineReducers } from "redux";
import authReducer from "./authReducer";
import playerReducer from "./playerReducer";
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    auth: authReducer,
    player: playerReducer,
    form: formReducer
});
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import playerReducer from "./playerReducer";
import tournamentReducer from "./tournamentReducer";
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    auth: authReducer,
    player: playerReducer,
    tournament: tournamentReducer,
    form: formReducer
});
import { GET_PLAYERS, SAVE_PLAYER, SAVE_PLAYER_ERROR } from "../actions/types";


const reducers = (state = { savedPlayer: { firstName: '', lastName: '', birthCountry: {} } }, action) => {
    switch (action.type) {
        case GET_PLAYERS:
            return { ...state, foundPlayers: action.players };
        case SAVE_PLAYER:
            return { ...state, savedPlayer: action.savedPlayer, successMessage: action.successMessage };
        case SAVE_PLAYER_ERROR:
            return { ...state, savedPlayerError: action.savedPlayerError };
        default:
            return state;
    }
};

export default reducers;
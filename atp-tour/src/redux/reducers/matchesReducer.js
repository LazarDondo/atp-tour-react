import { GET_MATCHES, SAVE_MATCHES, SAVE_MATCHES_ERROR, PREVIEW_MATCH } from "../actions/types";


const reducers = (state = { savedMatch: { firstPlayer: '', secondPlayer: '', tournament: '' }, foundMatches:{content:[{aaa:'aaa'}, {}]}}, action) => {
    switch (action.type) {
        case GET_MATCHES:
            return { ...state, foundMatches: action.foundMatches };
        case SAVE_MATCHES:
            return { ...state, savedMatches: action.savedMatches, successMessage: action.successMessage };
        case SAVE_MATCHES_ERROR:
            return { ...state, savedMatchesError: action.savedMatchesError };
        case PREVIEW_MATCH:
            return { ...state, foundMatch: action.payload };
        default:
            return state;
    }
};

export default reducers;
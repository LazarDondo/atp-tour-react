import { GET_TOURNAMENTS, SAVE_TOURNAMENT, SAVE_TOURNAMENT_ERROR } from "../actions/types";


const reducers = (state = { savedTournament: { name: '', tournamentType: '', hostCountry: {}, participants: [] } }, action) => {
    switch (action.type) {
        case GET_TOURNAMENTS:
            return { ...state, foundTournaments: action.tournaments };
        case SAVE_TOURNAMENT:
            return { ...state, savedTournament: {...action.savedTournament}, successMessage: action.successMessage };
        case SAVE_TOURNAMENT_ERROR:
            return { ...state, savedTournamentError: action.savedTournamentError };
        default:
            return state;
    }
};

export default reducers;
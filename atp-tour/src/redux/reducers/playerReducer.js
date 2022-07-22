import { GET_PLAYERS} from "../actions/types";


const reducers = (state = {}, action) => {
    switch (action.type) {
        case GET_PLAYERS:
            return { ...state, foundPlayers: action.players };
        default:
            return state;
    }
};

export default reducers;
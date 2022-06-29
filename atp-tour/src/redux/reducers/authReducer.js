import { LOGIN_FAILURE, LOGIN_SUCCESS } from "../actions/types";

const reducers = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return { ...state, loggedUser: action.user, loginError: '' };
        case LOGIN_FAILURE:
            console.log(333);
            return { ...state, loginError: action.error };
        default:
            return state;
    }
};

export default reducers;